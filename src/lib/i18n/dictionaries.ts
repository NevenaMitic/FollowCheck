export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionaries = {
  sr: {
    brand: "FollowCheck",
    localOnly: {
      badge: "Brza analiza",
      tooltip: "Instagram export ostaje pod tvojom kontrolom tokom cele analize.",
    },
    nav: {
      github: "Izvorni kod",
      start: "Kreni",
    },
    hero: {
      eyebrow: "Analiza Instagram followers / following podataka",
      title: "Vidi ko te zapravo prati nazad.",
      subtitle:
        "Učitaj svoj zvanični Instagram Data Export i za par sekundi saznaj ko te ne prati nazad, koga ti ne pratiš nazad i ko su tvoji obostrani pratioci — bez prijave, bez lozinke, bez slanja podataka bilo kome.",
      cta: "Počni analizu",
      ctaSecondary: "Kako funkcioniše",
      pillars: [
        { title: "Bez prijave", desc: "Nikad ne unosiš Instagram korisničko ime ni lozinku." },
        { title: "Tvoji podaci su sigurni", desc: "Tvoj Instagram fajl ostaje samo kod tebe." },
        { title: "Open source", desc: "Kod je javan — proveri sam da ništa ne curi." },
      ],
    },
    steps: {
      title: "Proces u 4 koraka",
      items: [
        { label: "Preuzmi export", desc: "Zatraži svoje podatke direktno od Instagrama." },
        { label: "Učitaj ZIP fajl", desc: "Prevuci fajl u browser — ostaje na tvom uređaju." },
        { label: "Automatska analiza", desc: "Aplikacija sama upoređuje tvoje liste i pronalazi razlike." },
        { label: "Pregled", desc: "Vidiš rezultate, ništa se ne šalje niti čuva." },
      ],
    },
    guide: {
      title: "Kako da preuzmeš svoj Instagram Data Export",
      subtitle:
        "Ovo je zvanična Instagram funkcija za preuzimanje tvojih podataka. Prati korake ispod — traje par minuta, a Instagram ti šalje mejl kad export bude spreman.",
      steps: [
        {
          title: "Dodirnite ikonicu sa tri linije (☰) u gornjem desnom uglu.",
          desc: "Iz menija koji se otvori izaberite Accounts Center (Centar za naloge)."
        },
        {
          title: "Uđite u odeljak Your information and permissions (Vaše informacije i dozvole).",
          desc: ""
        },
        {
          title: "Dodirnite opciju Export your information (Izvezite svoje informacije).",
          desc: "Izaberite svoj nalog."
        },
        {
          title: "Pritisnite dugme Create export (Kreiraj izvoz).",
          desc: ""
        },
        {
          title: "Izaberite Export to device (Izvoz na uređaj) kao odredište.",
          desc: ""
        },
        {
          title: "Izaberite opciju Customize information (Prilagodi informacije).",
          desc: "Obavezno izaberite HTML format i vremenski period „all time“ (sve vreme)."
        },
        {
          title: "Označite samo opciju Followers and following (Pratioci i nalozi koje pratite).",
          desc: "Nije potrebno da tražite sve podatke, već samo ovaj folder."
        },
        {
          title: "Potvrdite izvoz i sačekajte da vam stigne obaveštenje na e-mail.",
          desc: "Instagram će vas obavestiti kada izvoz bude spreman. Preuzmite ZIP fajl na svoj uređaj."
        }
      ],
      screenshotPlaceholder: "Screenshot koraka",
      next: "Imam fajl, idemo dalje",
    },
    upload: {
      title: "Učitaj ZIP fajl",
      subtitle: "Prevuci fajl ovde ili klikni da izabereš. Fajl ne napušta tvoj uređaj.",
      dropText: "Prevuci ZIP fajl ovde",
      or: "ili",
      browse: "Izaberi fajl",
      invalidType: "Ovo ne izgleda kao ZIP fajl. Proveri da li si izabrao ispravan export.",
      selected: "Izabran fajl",
      analyze: "Analiziraj",
      privacyNote: "Ovaj fajl se ne šalje ni na jedan server — obrada počinje odmah, lokalno.",
    },
    processing: {
      title: "Obrada u toku",
      subtitle: "Sve što vidiš ispod dešava se u tvom browseru.",
      log: [
        "Otvaram ZIP arhivu…",
        "Tražim followers_and_following folder…",
        "Čitam followers",
        "Čitam following",
        "Upoređujem liste…",
        "Računam zajedničke pratioce…",
        "Gotovo.",
      ],
      networkNote: "Podaci se obrađuju na uređaju",
    },
    results: {
      title: "Tvoji rezultati",
      description: "Instagram u preuzetim podacima može sadržati deaktivirane, obrisane ili nedostupne naloge. Zbog toga se brojevi u ovoj analizi mogu malo razlikovati od trenutnog broja koji je prikazan na vašem Instagram nalogu.",
      followers: "Prati te",
      following: "Ti pratiš",
      mutual: "Obostrano",
      notFollowingBack: "Ne prate te nazad",
      notFollowingBackDesc: "Ljudi koje ti pratiš, a oni tebe ne prate nazad.",
      fans: "Tvoje fanove ne pratiš",
      fansDesc: "Ljudi koji prate tebe, a ti njih ne pratiš.",
      mutualTab: "Obostrano praćenje",
      mutualDesc: "Obostrano se pratite.",
      searchPlaceholder: "Pretraži korisničko ime…",
      empty: "Nema rezultata za ovu pretragu.",
      emptyList: "Lista je prazna — čestitamo, sve je usklađeno!",
      openProfile: "Otvori Instagram profil",
      sortRecent: "Najskorije",
      sortAlpha: "A–Š",
      newAnalysis: "Nova analiza",
      flaggedLabel: "Deaktiviran?",
      flaggedHint: "Ručno si označio/la ovaj profil kao verovatno deaktiviran",
      flagToggleHint: "Neki od naloga su deaktivirani (označeno samo u tvom browseru)",
      statusHint: "Instagram ne dozvoljava automatsku proveru statusa profila — otvori link da proveriš ručno",
    },
    faq: {
  button: "FAQ",
  title: "Česta pitanja",
  subtitle: "Sve što treba da znaš o FollowCheck-u.",
  close: "Zatvori",
  back: "Nazad",

  categories: {
    general: "Osnovno",
    export: "Instagram export",
    results: "Rezultati",
    privacy: "Privatnost",
  },

  questions: {
    howItWorks: {
      question: "Šta je FollowCheck i kako radi?",
      answer:
        "FollowCheck je alat za analizu Instagram followers i following podataka, napravljen sa fokusom na privatnost. Umesto da traži tvoju lozinku ili pristup Instagram nalogu, koristi zvanični Instagram Data Export koji sam preuzimaš sa svog naloga. Nakon što preuzmeš podatke i učitaš ZIP fajl u FollowCheck, aplikacija lokalno analizira tvoje liste i pronalazi ko te ne prati nazad, koga ti ne pratiš nazad i sa kim imaš obostrano praćenje. Celokupna obrada odvija se direktno u tvom browseru — tvoji podaci se ne šalju na server i ne čuvaju se.",
    },

    login: {
      question: "Da li moram da se prijavim na Instagram?",
      answer:
        "Ne. Nema registracije, prijave niti potrebe za kreiranjem naloga. Jednostavno učitaj svoj Instagram Data Export i odmah pokreni analizu. FollowCheck ne traži tvoje Instagram podatke za prijavu i ne čuva tvoje lične podatke na serverima. Tvoji podaci ostaju na tvom uređaju tokom cele analize.",
    },

    catchAll: {
      question: "Da li postoji neka caka?",
      answer:
        "Nema skrivene cake. FollowCheck je napravljen sa fokusom na privatnost i transparentnost. Sve funkcije analize dostupne su bez pretplate, skrivenih uslova ili pristupa tvom Instagram nalogu. Tvoj Instagram Data Export obrađuje se u potpunosti u browseru i nikada se ne šalje niti čuva na našim serverima. Tvoji podaci ostaju pod tvojom kontrolom.",
    },

    password: {
      question: "Da li treba da unesem Instagram lozinku?",
      answer:
        "Ne. FollowCheck nikada ne traži tvoje Instagram korisničko ime, lozinku ili pristup nalogu. Za analizu ti je potreban samo zvanični Instagram Data Export koji sam preuzimaš sa svog naloga.",
    },

    ban: {
      question: "Da li mogu da dobijem zabranu zbog korišćenja FollowCheck-a?",
      answer:
        "Ne. FollowCheck ne komunicira sa Instagram serverima niti koristi Instagram API za proveru tvog naloga. Aplikacija samo obrađuje podatke iz Instagram Data Export fajla koji joj ti dostaviš. Zbog toga ne šalje zahteve Instagramu niti obavlja radnje na tvom nalogu.",
    },

    mode: {
      question: "Da li FollowCheck radi na svim uređajima?",
      answer:
        "Da! FollowCheck radi bez problema na svim uređajima — računaru, tabletu i telefonu. Nije potrebna nikakva aplikacija niti instalacija. Jednostavno otvori FollowCheck u browseru, učitaj svoj Instagram Data Export i pogledaj rezultate analize gde god da se nalaziš.",
    },

    people: {
      question: "Mogu li da analiziram nečiji drugi Instagram nalog?",
      answer:
        "Ne. FollowCheck radi samo sa tvojim Instagram Data Export fajlom. Ne možeš analizirati tuđi nalog niti podatke kojima nemaš pristup. Alat je napravljen tako da poštuje privatnost i obrađuje samo podatke koje sam dostaviš.",
    },

    export: {
      question: "Kako da vidim ko me je otpratio na Instagramu?",
      answer:
        "Prvo zatraži preuzimanje svojih Instagram podataka kroz Instagram Settings → Accounts Center → Your Information and Permissions → Download Your Information. Izaberi HTML format. Kada dobiješ e-mail od Instagrama sa spremnim podacima, preuzmi ZIP fajl i učitaj ga u FollowCheck. Aplikacija će odmah analizirati podatke i pokazati ti ko te ne prati nazad.",
    },

    time: {
      question: "Koliko traje analiza?",
      answer:
        "Instagram najčešće pripremi tražene podatke u roku od nekoliko minuta do nekoliko sati, mada kod većih naloga proces može trajati i duže. Dobićeš e-mail kada podaci budu spremni za preuzimanje. Nakon što učitaš ZIP fajl u FollowCheck, sama analiza traje svega nekoliko sekundi.",
    },

    exportFormat: {
      question: "Koji format treba da izaberem za export?",
      answer:
        "Prilikom zahteva za Instagram Data Export izaberi HTML format. FollowCheck koristi HTML podatke za analizu followers i following lista i ovaj format omogućava da aplikacija pravilno pronađe potrebne podatke.",
    },

    upload: {
      question: "Zašto ne mogu da učitam svoj ZIP fajl?",
      answer:
        "Proveri da li učitavaš originalni ZIP fajl koji si dobio od Instagrama i da li ga prethodno nisi raspakovao. Nemoj ručno menjati sadržaj ili strukturu ZIP arhive. Ako problem i dalje postoji, pokušaj da zatražiš novi Instagram Data Export i zatim učitaj novi ZIP fajl.",
    },

    differentNumbers: {
      question: "Zašto se brojevi mogu razlikovati od Instagrama?",
      answer:
        "Instagram u preuzetim podacima može sadržati deaktivirane, obrisane ili nedostupne naloge. Zbog toga se brojevi u ovoj analizi mogu malo razlikovati od trenutnog broja koji je prikazan na tvom Instagram nalogu. To ne znači da je analiza neispravna — razlika može nastati zbog samog exporta.",
    },

    notFollowingBack: {
      question: "Šta znači „Ne prate te nazad“?",
      answer:
        "To su nalozi koje ti pratiš, ali oni prema podacima iz tvog Instagram exporta ne prate tebe.",
    },

    fans: {
      question: "Šta znači „Tvoje fanove ne pratiš“?",
      answer:
        "To su ljudi koji prate tebe, ali ti njih ne pratiš.",
    },

    mutual: {
      question: "Šta znači „Obostrano praćenje“?",
      answer:
        "To su nalozi koje ti pratiš i koji takođe prate tebe. Dakle, pratite jedno drugo.",
    },

    stored: {
      question: "Da li se moji podaci čuvaju?",
      answer:
        "Ne. Tvoj ZIP fajl se ne šalje na server niti se tamo čuva. Analiza se obavlja direktno na tvom uređaju, u browseru. Nakon završetka analize, tvoji podaci ostaju samo na tvom uređaju.",
    },

    openSource: {
      question: "Da li mogu da proverim kako aplikacija radi?",
      answer:
        "Da. FollowCheck je open-source projekat i izvorni kod je javno dostupan. Svako može da ga pregleda i proveri kako aplikacija obrađuje podatke.",
    },
  },
},
    footer: {
      privacyTitle: "Tvoja privatnost je važna",
      privacyText:
        "Ne tražimo tvoju Instagram lozinku niti pristup tvom nalogu. Tvoj ZIP fajl se ne šalje na server i ne čuva se — sve se obrađuje direktno na tvom uređaju.",
      openSource: "Potpuno transparentno",
      openSourceText:
        "Kod aplikacije je javno dostupan na GitHub-u, pa svako može da proveri kako aplikacija radi i kako se obrađuju podaci.",
      viewGithub: "Pogledaj kod na GitHub-u",
      disclaimer:
        "Nezavisan projekat i nije povezan sa Instagramom ili kompanijom Meta.",
     
    },
    errors: {
      zipInvalid: "Fajl nije moguće otvoriti kao ZIP arhivu. Proveri da li si preneo(la) ispravan fajl.",
      noFollowersData: "U ZIP fajlu nije pronađen 'followers_and_following' folder. Proveri da li si tražio(la) podatke o pratiocima (Followers and following) prilikom export-a.",
      emptyData: "Followers i following fajlovi su prazni ili u neočekivanom formatu.",
      generic: "Došlo je do greške prilikom obrade fajla. Pokušaj ponovo.",
      tryAgain: "Pokušaj ponovo",
    },
    theme: { light: "Svetla", dark: "Tamna", system: "Sistem" },
    lang: { sr: "Srpski", en: "English" },
  },

  //english
  en: {
    brand: "FollowCheck",
    localOnly: {
      badge: "Fast analysis",
      tooltip: "Your Instagram data stays on your device and is never uploaded.",
    },
    nav: {
      github: "Source code",
      start: "Get started",
    },
    hero: {
      eyebrow: "Instagram followers / following analysis",
      title: "See who actually follows you back.",
      subtitle:
        "Upload your official Instagram Data Export and instantly see who doesn't follow you back, who you don't follow back, and your mutual followers — no login, no password, no data sent to anyone.",
      cta: "Start analysis",
      ctaSecondary: "How it works",
      pillars: [
        { title: "No login", desc: "You never enter your Instagram username or password." },
        { title: "Your Data Stays Yours", desc: "Your Instagram file stays on your device and is never shared." },
        { title: "Open source", desc: "The code is public — verify for yourself nothing leaks." },
      ],
    },
    steps: {
      title: "4-step process",
      items: [
        { label: "Get your export", desc: "Request your data directly from Instagram." },
        { label: "Upload the ZIP file", desc: "Drop the file in your browser — it stays on your device." },
        { label: "Automatic analysis", desc: "Your lists are compared automatically to find who follows you back." },
        { label: "Review your results", desc: "See who follows you back, who doesn’t, and who you’re not following back." },
      ],
    },
    guide: {
      title: "How to download your Instagram Data Export",
      subtitle:
        "This is an official Instagram feature for downloading your own data. Follow the steps below — it takes a couple of minutes, and Instagram emails you when the export is ready.",
      steps: [
        {
          title: "Tap the three lines (☰) icon in the top right corner.",
          desc: "Select Accounts Center from the menu that opens."
        },
        {
          title: "Enter the Your information and permissions section.",
          desc: ""
        },
        {
          title: "Tap the Export your information option.",
          desc: "Select your account, then tap Create export.",
        },
        {
          title: "Press the Create export button.",
          desc: ""
        },
        {
          title: "Select Export to device as the destination.",
          desc: ""
        },
        {
          title: "Click the Customize information option.",
          desc: "Make sure to use HTML format and date range 'all time'.",
        },
        {
          title: "Check only the 'Followers and following' option.",
          desc: "You don't need to request all data, just this folder.",
        },
        {
          title: "Confirm the Export and wait for it to arrive in your email.",
          desc: "Instagram will email you when the export is ready. Download the ZIP file to your device.",
        }

      ],
      screenshotPlaceholder: "Step screenshot",
      next: "I have the file, continue",
    },
    upload: {
      title: "Upload your ZIP file",
      subtitle: "Drop it here or click to browse. The file never leaves your device.",
      dropText: "Drop your ZIP file here",
      or: "or",
      browse: "Browse file",
      invalidType: "That doesn't look like a ZIP file. Make sure you picked the right export.",
      selected: "Selected file",
      analyze: "Analyze",
      privacyNote: "This file is never sent to any server — processing starts immediately, locally.",
    },
    processing: {
      title: "Processing",
      subtitle: "Everything below is happening in your browser.",
      log: [
        "Opening ZIP archive…",
        "Looking for followers_and_following folder…",
        "Reading followers",
        "Reading following",
        "Comparing lists…",
        "Calculating mutual followers…",
        "Done.",
      ],
      networkNote: "Data is processed locally on your device",
    },
    results: {
      title: "Your results",
      description: "Instagram may include deactivated, deleted, or unavailable accounts in your exported data. Because of this, the numbers in this analysis may differ slightly from the current numbers shown on your Instagram account.",
      followers: "Follow you",
      following: "You follow",
      mutual: "Mutual",
      notFollowingBack: "Don't follow you back",
      notFollowingBackDesc: "People you follow who don't follow you back.",
      fans: "You don't follow back",
      fansDesc: "People who follow you, but you don't follow them.",
      mutualTab: "Mutual followers",
      mutualDesc: "You follow each other.",
      searchPlaceholder: "Search username…",
      empty: "No results for this search.",
      emptyList: "This list is empty — nice, everything's in sync!",
      openProfile: "Open profile",
      sortRecent: "Most recent",
      sortAlpha: "A–Z",
      newAnalysis: "New analysis",
      flaggedLabel: "Deactivated?",
      flaggedHint: "You manually flagged this profile as likely deactivated",
      flagToggleHint: "Flag as likely deactivated (saved only in your browser)",
      statusHint: "Instagram doesn't allow automatic profile status checks — open the link to verify manually",
    },
    faq: {
      button: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about FollowCheck.",
      close: "Close",
      back: "Back",
      categories: {
        general: "General",
        export: "Instagram export",
        results: "Results",
        privacy: "Privacy",
      },
      questions: {
        howItWorks: {
          question: "What is FollowCheck and how does it work?",
          answer:
            "FollowCheck is an Instagram followers and following analysis tool built with privacy in mind. Instead of asking for your password or access to your Instagram account, it works with the official Instagram Data Export that you download yourself. Once you upload the ZIP file to FollowCheck, the app processes your follower and following lists locally and identifies who doesn't follow you back, who you don't follow back, and which connections are mutual. Everything is processed directly in your browser — your data is never uploaded to a server or stored.",
        },
        login: {
          question: "Do I need to log in with my Instagram account?",
          answer:
            "No registration. No login. No account required. Simply upload your Instagram Data Export and start your analysis instantly. FollowCheck is designed to keep things simple — no unnecessary steps, no Instagram credentials, and no personal data stored on our servers. Your data stays on your device throughout the entire analysis.",
        },
        catchAll: {
          question: "Is there a catch?",
          answer:
            "No catch. Just privacy and transparency. FollowCheck gives you everything you need to understand your Instagram followers and following lists — without subscriptions, hidden requirements, or access to your account. Your Instagram Data Export is processed entirely in your browser and never uploaded or stored on our servers. What happens to your data stays under your control.",
        },
        password: {
          question: "Do I need to enter my Instagram password?",
          answer:
            "No. FollowCheck never asks for your Instagram username, password, or account access.",
        },
        ban: {
          question: "Will I get banned for using this?",
          answer:
            "No. FollowCheck doesn't interact with Instagram's servers or APIs. It only processes the data you provide in your Instagram Data Export. Since it doesn't make any requests to Instagram, there's no risk of being banned or flagged for suspicious activity.",
        },
        mode:{
          question: "Does FollowCheck work on all devices?",
          answer:
            "Yes! FollowCheck works seamlessly across all your devices — desktop, tablet, and mobile. No app or installation is required. Simply open FollowCheck in your browser, upload your Instagram Data Export, and view your analysis wherever you are.",
        },
        people: {
          question: "Can I analyze someone else's Instagram account?",
          answer:
            "No. FollowCheck only works with your own Instagram Data Export. You cannot analyze someone else's account or data. The tool is designed to respect privacy and only process the data you have access to.",
        },
        export: {
          question: "How do I see who unfollowed me on Instagram?",
          answer:
            "First, request your Instagram data export from Instagram Settings → Accounts Center → Your Information and Permissions → Download Your Information. Choose HTML format. Once you receive the email with your data (usually within minutes to hours), download the ZIP file and upload it to FollowCheck. We'll instantly show you who doesn't follow you back.",
        },
        time: {
          question: "How long does the analysis take?",
          answer:
            "Instagram typically processes data requests within minutes to a few hours for most accounts. Larger accounts with more content may take up to 48 hours. You'll receive an email notification when your data is ready to download. Once you upload the ZIP file to FollowCheck, the analysis is almost instantaneous and takes just a few seconds.",
        },
        exportFormat: {
          question: "What format should I choose for the export?",
          answer:
            "Make sure to select HTML format when requesting your Instagram Data Export. This format is compatible with FollowCheck and allows for accurate analysis of your followers and following lists.",
        },
        upload: {
          question: "Why can't I upload my ZIP file?",
          answer:
            "Make sure you're uploading the original ZIP file from Instagram without extracting it first. The file should be named something like 'instagram-username-date.zip'. If you're still having issues, try requesting a fresh data export from Instagram.",
        },
        differentNumbers: {
          question: "Why might the numbers differ from Instagram?",
          answer:
            "Instagram may include deactivated, deleted, or unavailable accounts in your exported data. Because of this, the analysis results may differ slightly from the current state shown on Instagram.",
        },
        notFollowingBack: {
          question: "What does “Don't follow you back” mean?",
          answer:
            "These are accounts you follow, but that don't currently follow you according to your Instagram export.",
        },
        fans: {
          question: "What does “You don't follow back” mean?",
          answer:
            "These are people who follow you, but you don't follow them.",
        },
        mutual: {
          question: "What does “Mutual followers” mean?",
          answer:
            "These are accounts that you follow and that also follow you.",
        },
        stored: {
          question: "Is my data stored?",
          answer:
            "No. Your ZIP file is never uploaded to a server or stored. The analysis happens directly on your device.",
        },
        openSource: {
          question: "Can I check how the app works?",
          answer:
            "Yes. FollowCheck is an open-source project and its source code is publicly available.",
        },
      },
    },
    footer: {
      privacyTitle: "Your Privacy Matters",
      privacyText:
        "We never ask for your Instagram password or access to your account. Your ZIP file is never uploaded or stored — everything is processed directly on your device.",
      openSource: "Fully Transparent",
      openSourceText:
        "The app's code is publicly available on GitHub, so anyone can see how it works and how your data is handled.",
      viewGithub: "View the Code on GitHub",
      disclaimer:
        "Independent project. Not affiliated with or endorsed by Instagram or Meta.",
    },
    errors: {
      zipInvalid: "This file couldn't be opened as a ZIP archive. Make sure you uploaded the right file.",
      noFollowersData: "No 'followers_and_following' folder was found in the ZIP. Make sure you requested 'Followers and following' data in your export.",
      emptyData: "The followers and following files are empty or in an unexpected format.",
      generic: "Something went wrong while processing the file. Please try again.",
      tryAgain: "Try again",
    },
    theme: { light: "Light", dark: "Dark", system: "System" },
    lang: { sr: "Srpski", en: "English" },
  },
} as const;

export type Dictionary = typeof dictionaries.sr;