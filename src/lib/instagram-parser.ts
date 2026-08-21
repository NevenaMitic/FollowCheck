import JSZip from "jszip";

export type IgUser = {
  username: string;
  href: string;
  timestamp: number | null;
};

export type ParseResult = {
  followers: IgUser[];
  following: IgUser[];
  mutual: IgUser[];
  notFollowingBack: IgUser[];
  fans: IgUser[];
};

export class InstagramParseError extends Error {}

type StringListEntry = {
  href?: string;
  value?: string;
  timestamp?: number;
};

type RelationshipEntry = {
  title?: string;
  string_list_data?: StringListEntry[];
};

function extractEntries(raw: unknown): RelationshipEntry[] {
  if (Array.isArray(raw)) {
    return raw as RelationshipEntry[];
  }

  if (raw && typeof raw === "object") {
    const object = raw as Record<string, unknown>;

    // Prvo tražimo poznati Instagram key
    if (Array.isArray(object.relationships_following)) {
      return object.relationships_following as RelationshipEntry[];
    }

    // Fallback: traži prvi array unutar objekta
    for (const value of Object.values(object)) {
      if (Array.isArray(value)) {
        return value as RelationshipEntry[];
      }
    }
  }

  return [];
}

function normalizeUsername(username: string): string {
  return username.trim().replace(/^@/, "").toLowerCase();
}

function createUser(
  username: string,
  href?: string,
  timestamp?: number
): IgUser {
  const cleanUsername = username.trim().replace(/^@/, "");

  return {
    username: cleanUsername,
    href:
      href?.trim() ||
      `https://www.instagram.com/${encodeURIComponent(cleanUsername)}/`,
    timestamp:
      typeof timestamp === "number"
        ? timestamp
        : null,
  };
}

function toUsers(entries: RelationshipEntry[]): IgUser[] {
  const users: IgUser[] = [];

  for (const entry of entries) {
    const item = entry.string_list_data?.[0];

    if (!item?.value) {
      continue;
    }

    users.push(
      createUser(
        item.value,
        item.href,
        item.timestamp
      )
    );
  }

  return users;
}

/**
 * Čita JSON fajlove iz ZIP-a.
 */
async function readJsonFiles(
  zip: JSZip,
  matcher: (path: string) => boolean
): Promise<unknown[]> {
  const paths = Object.keys(zip.files).filter(
    (path) =>
      !zip.files[path].dir &&
      matcher(path.toLowerCase())
  );

  console.log("[Instagram Parser] JSON files found:", paths);

  const results: unknown[] = [];

  for (const path of paths) {
    try {
      const text = await zip.files[path].async("text");

      console.log(
        `[Instagram Parser] Reading JSON: ${path}`
      );

      const parsed = JSON.parse(text);

      results.push(parsed);

      console.log(
        `[Instagram Parser] Successfully parsed: ${path}`
      );
    } catch (error) {
      console.warn(
        `[Instagram Parser] Failed to parse JSON: ${path}`,
        error
      );
    }
  }

  return results;
}

function extractUsernameFromInstagramUrl(
  href: string,
  fallbackText: string
): string {
  const knownNonUsernameSegments = new Set([
    "_u",
    "accounts",
    "about",
    "explore",
    "direct",
    "reels",
    "stories",
    "p",
  ]);

  try {
    const url = new URL(href);

    const parts = url.pathname
      .split("/")
      .filter(Boolean)
      .filter((part) => !knownNonUsernameSegments.has(part.toLowerCase()));

    if (parts.length > 0) {
      // Poslednji preostali segment je (skoro uvek) username.
      return parts[parts.length - 1];
    }
  } catch {
    // Ako URL nije validan, koristimo tekst iz <a> taga.
  }

  return fallbackText;
}


async function readHtmlUsers(
  zip: JSZip,
  matcher: (path: string) => boolean
): Promise<IgUser[]> {
  const paths = Object.keys(zip.files).filter(
    (path) =>
      !zip.files[path].dir &&
      matcher(path.toLowerCase()) &&
      path.toLowerCase().endsWith(".html")
  );

  console.log("[Instagram Parser] HTML files found:", paths);

  const users: IgUser[] = [];

  for (const path of paths) {
    try {
      const html = await zip.files[path].async("text");

      console.log(`[Instagram Parser] Reading HTML: ${path}`);
      console.log(`[Instagram Parser] HTML file size (chars): ${html.length}`);

      // DEBUG: sirovi broj <a href> tagova u fajlu, pre bilo kakvog filtriranja
      const rawAnchorCount = (html.match(/<a[^>]+href=/gi) || []).length;
      console.log(`[Instagram Parser] Raw <a href> count in ${path}: ${rawAnchorCount}`);

      const anchorRegex =
        /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

      const ignored = new Set([
        "accounts",
        "about",
        "explore",
        "direct",
        "reels",
        "stories",
        "p",
        "_u",
      ]);

      let matchCount = 0;
      let skippedNoInstagram = 0;
      let skippedIgnored = 0;
      let skippedEmptyUsername = 0;
      let keptThisFile = 0;

      let match: RegExpExecArray | null;

      while ((match = anchorRegex.exec(html)) !== null) {
        matchCount++;

        const href = match[1];
        const rawText = match[2];

        const username = rawText.replace(/<[^>]*>/g, "").trim();

        if (!href.includes("instagram.com")) {
          skippedNoInstagram++;
          continue;
        }

        const finalUsername = extractUsernameFromInstagramUrl(href, username);

        if (!finalUsername) {
          skippedEmptyUsername++;
          continue;
        }

        if (ignored.has(normalizeUsername(finalUsername))) {
          skippedIgnored++;
          continue;
        }

        users.push(createUser(finalUsername, href));
        keptThisFile++;
      }

      console.log(
        `[Instagram Parser] ${path} summary → regex matches: ${matchCount}, ` +
        `skipped (no instagram.com): ${skippedNoInstagram}, ` +
        `skipped (empty username): ${skippedEmptyUsername}, ` +
        `skipped (ignored): ${skippedIgnored}, ` +
        `kept: ${keptThisFile}`
      );

      // Ako je raw broj anchor-a mnogo veći od keptThisFile, filteri jedu entrije.
      // Ako je raw broj anchor-a mali (blizu keptThisFile), problem je u samom fajlu (nepotpun export).
      if (rawAnchorCount > 0 && keptThisFile === 0) {
        console.warn(
          `[Instagram Parser] WARNING: ${path} has ${rawAnchorCount} anchors but 0 were kept — check filter logic.`
        );
      }
    } catch (error) {
      console.warn(`[Instagram Parser] Failed to read HTML: ${path}`, error);
    }
  }

  console.log(`[Instagram Parser] Total users extracted across all matched files:`, users.length);

  return users;
}

/**
 * Uklanja duplicate username-ove.
 */
function uniqueUsers(users: IgUser[]): IgUser[] {
  const map = new Map<string, IgUser>();

  for (const user of users) {
    const key = normalizeUsername(user.username);

    if (!map.has(key)) {
      map.set(key, user);
    }
  }

  return Array.from(map.values());
}

export type ProgressStep =
  | "opening"
  | "locating"
  | "reading-followers"
  | "reading-following"
  | "comparing"
  | "done";

export async function parseInstagramExport(
  file: File,
  onProgress?: (step: ProgressStep) => void
): Promise<ParseResult> {
  console.group(
    "[Instagram Parser] Starting import"
  );

  console.log("File:", file.name);
  console.log("File size:", file.size);
  console.log("File type:", file.type);

  onProgress?.("opening");

  let zip: JSZip;

  try {
    zip = await JSZip.loadAsync(file);
  } catch (error) {
    console.error(
      "[Instagram Parser] Invalid ZIP file",
      error
    );

    console.groupEnd();

    throw new InstagramParseError(
      "zip-invalid"
    );
  }

  const allPaths = Object.keys(zip.files);

  console.log(
    "[Instagram Parser] Total files in ZIP:",
    allPaths.length
  );

  console.log(
    "[Instagram Parser] ZIP contents:",
    allPaths
  );

  onProgress?.("locating");

  const followersAndFollowingFiles =
    allPaths.filter((path) =>
      path
        .toLowerCase()
        .includes("followers_and_following")
    );

  console.log(
    "[Instagram Parser] followers_and_following files:",
    followersAndFollowingFiles
  );

  if (
    followersAndFollowingFiles.length === 0
  ) {
    console.error(
      "[Instagram Parser] followers_and_following folder not found"
    );

    console.groupEnd();

    throw new InstagramParseError(
      "no-followers-data"
    );
  }

  // ============================================================
  // FOLLOWERS
  // ============================================================

  onProgress?.("reading-followers");

  console.log(
    "[Instagram Parser] Reading followers..."
  );

  let followers: IgUser[] = [];

  // JSON followers
  const followerJsons = await readJsonFiles(
    zip,
    (path) =>
      path.includes(
        "followers_and_following"
      ) &&
      /followers(?:_\d+)?\.json$/.test(path)
  );

  followers = followerJsons.flatMap((raw) =>
    toUsers(extractEntries(raw))
  );

  // HTML followers
  if (followers.length === 0) {
    console.log(
      "[Instagram Parser] No follower JSON found. Trying HTML..."
    );

    followers = await readHtmlUsers(
      zip,
      (path) =>
        path.includes(
          "followers_and_following"
        ) &&
        /followers(?:_\d+)?\.html$/.test(path)
    );
  }

  followers = uniqueUsers(followers);

  console.log(
    "[Instagram Parser] Followers:",
    followers.length
  );

  console.log(
    "[Instagram Parser] First followers:",
    followers.slice(0, 5)
  );

  // ============================================================
  // FOLLOWING
  // ============================================================

  onProgress?.("reading-following");

  console.log(
    "[Instagram Parser] Reading following..."
  );

  let following: IgUser[] = [];

  // JSON following
  const followingJsons = await readJsonFiles(
    zip,
    (path) =>
      path.includes(
        "followers_and_following"
      ) &&
      /following(?:_\d+)?\.json$/.test(path)
  );

  following = followingJsons.flatMap((raw) =>
    toUsers(extractEntries(raw))
  );

  // HTML following
  if (following.length === 0) {
    console.log(
      "[Instagram Parser] No following JSON found. Trying HTML..."
    );

    following = await readHtmlUsers(
      zip,
      (path) =>
        path.includes(
          "followers_and_following"
        ) &&
        /following(?:_\d+)?\.html$/.test(path)
    );
  }

  following = uniqueUsers(following);

  console.log(
    "[Instagram Parser] Following:",
    following.length
  );

  console.log(
    "[Instagram Parser] First following:",
    following.slice(0, 5)
  );

  // ============================================================
  // VALIDATION
  // ============================================================

  if (
    followers.length === 0 &&
    following.length === 0
  ) {
    console.error(
      "[Instagram Parser] No followers or following data found"
    );

    console.groupEnd();

    throw new InstagramParseError(
      "empty-data"
    );
  }

  // ============================================================
  // COMPARING
  // ============================================================

  onProgress?.("comparing");

  console.log(
    "[Instagram Parser] Comparing followers and following..."
  );

  const followerSet = new Set(
    followers.map((user) =>
      normalizeUsername(user.username)
    )
  );

  const followingSet = new Set(
    following.map((user) =>
      normalizeUsername(user.username)
    )
  );

  // Oni koje ti pratiš i oni prate tebe
  const mutual = following.filter((user) =>
    followerSet.has(
      normalizeUsername(user.username)
    )
  );

  // Ti njih pratiš, oni tebe NE prate
  const notFollowingBack = following.filter(
    (user) =>
      !followerSet.has(
        normalizeUsername(user.username)
      )
  );

  // Oni tebe prate, ti njih NE pratiš
  const fans = followers.filter(
    (user) =>
      !followingSet.has(
        normalizeUsername(user.username)
      )
  );

  console.log(
    "[Instagram Parser] ========================"
  );

  console.log(
    "[Instagram Parser] RESULTS"
  );

  console.log(
    "[Instagram Parser] Followers:",
    followers.length
  );

  console.log(
    "[Instagram Parser] Following:",
    following.length
  );

  console.log(
    "[Instagram Parser] Mutual:",
    mutual.length
  );

  console.log(
    "[Instagram Parser] Not following back:",
    notFollowingBack.length
  );

  console.log(
    "[Instagram Parser] Fans:",
    fans.length
  );

  console.log(
    "[Instagram Parser] ========================"
  );

  console.log(
    "[Instagram Parser] Not following back:",
    notFollowingBack
  );

  console.log(
    "[Instagram Parser] Fans:",
    fans
  );

  onProgress?.("done");

  console.log(
    "[Instagram Parser] Import completed successfully."
  );

  console.groupEnd();

  return {
    followers,
    following,
    mutual,
    notFollowingBack,
    fans,
  };
}