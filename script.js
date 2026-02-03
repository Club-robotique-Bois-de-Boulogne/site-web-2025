
    /* ===== HORLOGE ===== */
    function updateClock() {
        const d = new Date();
        document.getElementById("clock").textContent =
            `${String(d.getHours()).padStart(2,"0")} h ${String(d.getMinutes()).padStart(2,"0")}`;
    }
    setInterval(updateClock, 60000);
    updateClock();
    /* ===================== NAVIGATION (DOT ACTIF) ===================== */



    /* ===== ACTUALITÉS (DÉMO LOCALE GARANTIE) ===== */
    /* ===== RADIO-CANADA ===== */
    const RSS_URL = "https://ici.radio-canada.ca/rss/4159";
    const PROXY = "https://api.allorigins.win/raw?url=";

    const newsImage = document.getElementById("newsImage");
    const newsTitle = document.getElementById("newsTitle");
    const newsDate = document.getElementById("newsDate");

    let news = [];
    let index = 0;const pages = [
        "index.html",
        "club.html",
        "equipe.html",
        "robot.html",
        "crc.html",
        "video.html"
    ];

    const stations = [
        { name: "Prochaine station : Accueil", image: "images/mur metro.webp" },
        { name: "Prochaine station : Club", image: "images/club.webp" },
        { name: "Prochaine station : L’équipe", image: "images/equipe.webp" },
        { name: "Prochaine station : Bob le Robot", image: "images/robot.webp" },
        { name: "Prochaine station : CRC", image: "images/CRC-Robotics.jpg" },
        { name: "Prochaine station : Vidéo", image: "images/Mtl-metro-map.svg.png" }
    ];

    const dots = document.querySelectorAll(".dot");

// page actuelle
    const currentPage =
        location.pathname.split("/").pop().toLowerCase();

// index actuel
    let currentIndex = pages.indexOf(currentPage);
    if (currentIndex === -1) currentIndex = 0;

// DOT ACTIF
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });

// PROCHAINE STATION
    const nextIndex = (currentIndex + 1) % stations.length;
    document.getElementById("stationName").textContent =
        stations[nextIndex].name;
    document.getElementById("stationImage").src =
        stations[nextIndex].image;


    async function loadNews() {
        const res = await fetch(PROXY + encodeURIComponent(RSS_URL));
        const text = await res.text();
        const xml = new DOMParser().parseFromString(text, "text/xml");

        news = [...xml.querySelectorAll("item")].map(item => ({
            title: item.querySelector("title")?.textContent || "",
            date: new Date(item.querySelector("pubDate")?.textContent)
                .toLocaleDateString("fr-CA", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }),
            image: item.querySelector("enclosure")?.getAttribute("url")
        })).filter(n => n.image);

        showNews();
    }

    function showNews() {
        if (!news.length) return;
        const n = news[index];
        newsImage.src = n.image;
        newsTitle.textContent = n.title;
        newsDate.textContent = n.date;
        index = (index + 1) % news.length;
    }

    setInterval(showNews, 7000);
    loadNews();
    /* ================== DOM READY ================== */
    document.addEventListener("DOMContentLoaded", () => {

        const navSound = document.getElementById("navSound");
        if (!navSound) return;

        let targetUrl = null;

        const navLinks = document.querySelectorAll(
            "a[href]:not([target='_blank'])"
        );

        navLinks.forEach(link => {
            link.addEventListener("click", function (e) {
                const url = this.getAttribute("href");

                // Ignore ancres ou liens vides
                if (!url || url.startsWith("#")) return;

                e.preventDefault();
                targetUrl = url;

                navSound.currentTime = 0;
                navSound.play().catch(() => {
                    // fallback si le son est bloqué
                    window.location.href = targetUrl;
                });
            });
        });

        // 🔔 Quand le son est TERMINÉ → navigation
        navSound.addEventListener("ended", () => {
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });

    });
    /* ===== MASQUAGE HORLOGE + ACTUALITÉS AU SCROLL ===== */

    const hideElements = document.querySelectorAll(".hide-on-scroll");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            hideElements.forEach(el => el.classList.add("hidden"));
        } else {
            hideElements.forEach(el => el.classList.remove("hidden"));
        }
    });
    /* ============================================ */
    /* ===== SWITCH LANGUE ===== */
    /* ============================
       SYSTÈME DE TRADUCTION LOCAL
       ============================ */

// 🟦 1. Dictionnaire des traductions
    const translations = {

        /* ===== ACCUEIL ===== */
        "Le club de Robotique de Bois-de-Boulogne vous souhaite la bienvenue à bord !":
            "The Bois-de-Boulogne Robotics Club welcomes you aboard!",

        "Le club a en son sein les meilleurs talents du CÉGEP.":
            "The club brings together the best talents of the CEGEP.",

        "Les cônes sont partout":
            "Cones are everywhere",

        "Votre premier arrêt consiste à découvrir le chemin chargé de cônes oranges qu'on a dû parcourir pour arriver à la compétition CRC. On vous rassure que nous avons eu du plaisir.":
            "Your first stop is to discover the long path filled with orange cones we had to cross to reach the CRC competition. Rest assured, we had fun.",

        "Découvrez l'équipe":
            "Meet the team",

        "L'équipe de robotique de Bois-de-Boulogne est composée d'étudiants passionnés de robotique et de technologie. Ils ont travaillé fort cette année 2025-2026 pour vous offrir le meilleur spectacle.":
            "The Bois-de-Boulogne robotics team is made up of students passionate about robotics and technology. They worked hard this year to offer you the best show.",

        "Le bolide du siècle":
            "The machine of the century",

        "Bob est le bolide d'Émilien, ne vous fiez pas à l'apparence, il va faire mordre la poussière à ses compétiteurs. Son robot est venu pour gagner.":
            "Bob is Emilien’s racing car — don’t be fooled by its appearance, it will make competitors eat dust. His robot is here to win.",

        "En route vers la CRC":
            "On the way to CRC",

        "À la station suivante, découvrez le monde magique de la CRC et de sa compétition.":
            "At the next station, discover the magical world of CRC and its competition.",

        "Une ébauche de vidéo":
            "A video preview",


        /* ===== CLUB ===== */
        "Nouvelle année, nouveaux locaux !":
            "New year, new facilities!",

        "Malgré les nombreux travaux entrepris dans le collège et le fait que l'administration ne sache pas où mettre les étudiant(e)s, le club a hérité d'un nouveau local. Nous sommes content(e)s de cette acquisition.":
            "Despite the extensive construction work in the college and the administration not knowing where to place students, the club inherited a new room. We are happy with this acquisition.",

        "La Nouvelle Acquisition":
            "The New Acquisition",

        "Le Père Noël nous a livré notre cadeau en avance cette année. Au mois d'octobre, nous avons reçu notre commande : l'Original Prusa Core One Kit d'imprimante 3D. L'équipe se sert de cette imprimante pour créer des objets et des prototypes pour le robot et pour le kiosque.":
            "Santa Claus delivered our gift early this year. In October, we received our order: the Original Prusa Core One 3D printer kit. The team uses this printer to create objects and prototypes for the robot and the kiosk.",

        "Un plan pour un kiosque et un thème pas si évident que ça à trouver":
            "A plan for a kiosk and a theme not so easy to find",

        "En septembre, l'équipe s'est mise à la recherche d'un thème pour la compétition. Cela a été un défi, car plusieurs thèmes ont fait débat : le métro de Montréal, Le Petit Prince et Charlie Chaplin. Toutefois, si vous ne l'avez pas encore compris, le thème victorieux est le métro de Montréal. Le kiosque aura l'allure d'un quai de station et renfermera quelques surprises à l'intérieur.":
            "In September, the team began searching for a theme for the competition. It was a challenge, as several themes sparked debate: the Montreal metro, The Little Prince, and Charlie Chaplin. However, if you haven't figured it out yet, the winning theme is the Montreal metro. The kiosk will look like a station platform and will contain a few surprises inside.",

        "Martin et ses bricoleurs":
            "Martin and his DIY crew",

        "Ce kiosque était une vraie blague. On a dû le démonter et le remonter plusieurs fois. La première fois parce que c'était le thème de l'année passée et nous devions vérifier les dimensions. En remontant le kiosque, on a découvert que les morceaux de MDF n'étaient pas réutilisables. Martin et ses coéquipiers sont donc allés chercher des planches de remplacement. On a dû démonter et remonter le kiosque une fois de plus. Le projet a été un vrai casse-tête, mais l'équipe a réussi à le terminer à temps.":
            "This kiosk was a real joke. We had to take it apart and rebuild it several times. The first time was because it was last year's theme and we needed to check the dimensions. While rebuilding it, we discovered that the MDF pieces were not reusable. Martin and his teammates went to get replacement boards. We had to dismantle and rebuild the kiosk once again. The project was a real puzzle, but the team managed to finish it on time.",

        "Plusieurs versions pour Bob":
            "Several versions for Bob",

        "Cette année Bob a connu deux versions différentes. La première version était une version de base, et la deuxième version a été améliorée avec des fonctionnalités supplémentaires. Il a eu des problèmes de moteur et d'équilibre mais l'équipe a réussi à les corriger.":
            "This year, Bob went through two different versions. The first version was a basic one, and the second version was improved with additional features. He had motor and balance issues, but the team managed to fix them.",

        "Nos vidéos":
            "Our videos",

        "Les pas de super Bob !!":
            "Super Bob’s first steps!!",

        "Jules qui fait ses premiers pas à Bob.":
            "Jules helping Bob take his first steps.",

        "Émilien teste le bras du robot":
            "Émilien tests the robot’s arm",

        "Émilien teste le bras du robot avant la compétition. Une version avec beaucoup d'espoir qui n'aboutira pas.":
            "Émilien tests the robot’s arm before the competition. A version full of hope that ultimately didn’t work out.",


        /* ===== CRC ===== */
        "Qu'est-ce que Robotique CRC":
            "What is CRC Robotics",

        "La Robotique CRC est un organisme à but non lucratif fondé en 2001 par des enseignants et de jeunes professionnels passionnés. Sa mission est d'encourager l'interdisciplinarité à travers la robotique, en créant un pont entre les domaines STIM (science, technologie, ingénierie et mathématiques) et les arts, les langues et la communication.":
            "CRC Robotics is a non-profit organization founded in 2001 by teachers and passionate young professionals. Its mission is to encourage interdisciplinarity through robotics, creating a bridge between STEM fields (science, technology, engineering, and mathematics) and the arts, languages, and communication.",

        "Qu'en est-il de la compétition":
            "What about the competition",

        "La compétition de robotique CRC est un défi multidisciplinaire qui s'étend sur environ quatre mois. Durant cette période, les différentes écoles qui y participent doivent :":
            "The CRC robotics competition is a multidisciplinary challenge that lasts about four months. During this period, the participating schools must:",

        "Créer une vidéo":
            "Create a video",

        "Monter un kiosque":
            "Build a kiosk",

        "Faire un tutoriel":
            "Make a tutorial",

        "Concevoir et construire un robot":
            "Design and build a robot",

        "L'aventure se termine par une finale de trois jours. Les différentes écoles se rassemblent pour affronter leur robot, présenter leur kiosque et participer à une compétition de programmation.":
            "The adventure ends with a three‑day final event. The different schools gather to compete with their robot, present their kiosk, and participate in a programming competition.",

        "LE JEU":
            "THE GAME",

        "But du jeu":
            "Objective of the game",

        "Le but du jeu est d’amasser le plus de points possible en accomplissant différentes tâches avec le robot sur le terrain de jeu. Chaque tâche réussie rapporte un certain nombre de points, et l’équipe avec le plus de points à la fin du match remporte la victoire.":
            "The objective of the game is to score as many points as possible by completing different tasks with the robot on the playing field. Each successful task awards a certain number of points, and the team with the most points at the end of the match wins.",

        "Le terrain de jeu":
            "The playing field",

        "Le terrain de jeu est un rectangle de 8 cases par 5. Il comporte 6 stations de réparation et 3 moteurs par équipe (pour un total de 6). Une zone de pièces supplémentaires pour chaque équipe se trouve également à une des extrémités du terrain.":
            "The playing field is a rectangle of 8 squares by 5. It includes 6 repair stations and 3 motors per team (for a total of 6). A zone for extra pieces for each team is also located at one end of the field.",

        "Les pièces de jeu":
            "Game pieces",

        "Dans le jeu, il existe trois types de pièces : Il existe également trois couleurs de pièces :\n\nPièces bleues et jaunes : pièces d'équipe pour marquer des points.\nPièces rouges : pièces neutres à utiliser avec les stations de réparation.":
            "In the game, there are three types of pieces. There are also three colors of pieces:\n\nBlue and yellow pieces: team pieces used to score points.\nRed pieces: neutral pieces used with repair stations.",

        "Ventilateur":
            "Fan",

        "Coeur":
            "Core",

        "Turbine":
            "Turbine",

        "Les stations":
            "Stations",

        "Le terrain comporte deux types de stations : les moteurs et les stations de réparation. Chaque station peut accueillir jusqu'à trois pièces, correspondant aux trois types disponibles dans le jeu.":
            "The field includes two types of stations: motors and repair stations. Each station can hold up to three pieces, corresponding to the three types available in the game.",

        "Les moteurs":
            "Motors",

        "Les moteurs rapportent des points selon le nombre de pièces de la couleur de l’équipe qui y sont placées :\n\n1 pièce : 50 points\n2 pièces : 100 points\n3 pièces : 250 points":
            "Motors award points based on the number of pieces of the team's color placed in them:\n\n1 piece: 50 points\n2 pieces: 100 points\n3 pieces: 250 points",

        "Les stations de réparation":
            "Repair stations",

        "Elles permettent d’échanger une pièce neutre (rouge) contre une pièce de la couleur de l’équipe. Cela aide à obtenir plus de pièces à placer dans les moteurs ou dans la zone de pièces supplémentaires.":
            "They allow a neutral piece (red) to be exchanged for a piece of the team’s color. This helps obtain more pieces to place in the motors or in the extra pieces zone.",

        "Les zones de pièces supplémentaires":
            "Extra pieces zones",

        "Chaque pièce placée dans cette zone rapporte 40 points supplémentaires.":
            "Each piece placed in this zone awards an additional 40 points.",

        "Les bonus":
            "Bonuses",

        "Un aspect très important du jeu est la présence de deux bonus, tous deux liés à la zone de pièces supplémentaires :\n\nBonus de hauteur : l’équipe qui a la tour de pièces la plus haute reçoit un bonus de +60 %.\nBonus de quantité : l’équipe qui a le plus de pièces dans la zone supplémentaire reçoit un bonus de +40 %.":
            "A very important aspect of the game is the presence of two bonuses, both related to the extra pieces zone:\n\nHeight bonus: the team with the tallest stack of pieces receives a +60% bonus.\nQuantity bonus: the team with the most pieces in the extra zone receives a +40% bonus.",


        /* ===== BOB ===== */
        "Bob dans sa forme olympique":
            "Bob in his Olympic form",

        "L’équipe qui a travaillé sur Bob cette année 2025‑2026 est fière de vous présenter son robot final.":
            "The team that worked on Bob this year, 2025–2026, is proud to present its final robot.",

        "Châssis":
            "Chassis",

        "Le châssis constitue la base d’un robot fiable et performant. Le nôtre est entièrement boulonné afin d’assurer une structure droite, rigide et légère. Nous avons opté pour des roues omnidirectionnelles, ce qui permet une navigation fluide et précise sur un terrain plat. Les roues sont protégées par des profilés en aluminium 2020 et maintenues droites grâce à des roulements à billes, ce qui réduit les frottements et améliore la durabilité. Un espace a été réservé à l’arrière du châssis pour accueillir la batterie et le CRCStop, les rendant facilement accessibles pour la sécurité et la maintenance.":
            "The chassis forms the foundation of a reliable and high‑performance robot. Ours is fully bolted together to ensure a straight, rigid, and lightweight structure. We chose omnidirectional wheels, allowing smooth and precise navigation on flat terrain. The wheels are protected by 2020 aluminum profiles and kept straight using ball bearings, reducing friction and improving durability. A space was reserved at the back of the chassis to house the battery and the CRCStop, making them easily accessible for safety and maintenance.",

        "Pinces":
            "Grippers",

        "Cette année, nos pinces utilisent un système de pignon et crémaillère afin de maximiser la force de prise. Elles sont actionnées par des servomoteurs, ce qui permet de réduire la masse totale présente sur le bras. Pour améliorer l’adhérence, nous utilisons de l’Alien Tape™, notre solution clé pour éviter les glissements. Les pinces sont positionnées aux extrémités opposées du bras, assurant un contrepoids constant lors de la rotation. Elles sont orientées à 90°, ce qui permet d’attraper efficacement les bobines, qu’elles soient debout ou à plat.":
            "This year, our grippers use a rack‑and‑pinion system to maximize gripping force. They are powered by servomotors, which helps reduce the total mass on the arm. To improve grip, we use Alien Tape™, our key solution to prevent slipping. The grippers are positioned at opposite ends of the arm, ensuring constant counterbalance during rotation. They are oriented at 90°, allowing efficient handling of coils whether upright or lying flat.",

        "Avantage : Avec seulement quatre points de contact, la prise est plus constante, peu importe la position initiale de la pièce.":
            "Advantage: With only four contact points, the grip is more consistent regardless of the initial position of the piece.",

        "Désavantage : Nous arrivons à la date limite de remise du site web. Pour en savoir plus, passez nous voir durant la compétition !":
            "Disadvantage: We are reaching the website submission deadline. To learn more, come see us during the competition!",

        "Bras":
            "Arm",

        "Le bras du robot est constitué d’une extrusion en aluminium capable de tourner sur lui‑même grâce à un moteur. L’axe central traverse deux roulements à billes, ce qui minimise le jeu mécanique tout en maximisant la solidité et la stabilité lors des mouvements rapides ou sous charge.":
            "The robot’s arm is made of an aluminum extrusion capable of rotating on itself using a motor. The central shaft passes through two ball bearings, minimizing mechanical play while maximizing strength and stability during fast or loaded movements.",

        "Ascenseur":
            "Lift",

        "L’ascenseur permet le déplacement vertical du bras grâce à un système de chaîne et de roues dentées. Le choix d’une chaîne évite les problèmes de retensionnement liés à la fatigue d’une courroie. À la base se trouve un interrupteur de position servant à calibrer la position initiale du bras et à empêcher le pilote de dépasser les limites mécaniques.":
            "The lift enables vertical movement of the arm using a chain‑and‑sprocket system. Choosing a chain avoids retensioning issues caused by belt fatigue. At the base is a position switch used to calibrate the arm’s initial position and prevent the driver from exceeding mechanical limits.",

        "Obstacles / Solutions":
            "Obstacles / Solutions",

        "Axe difficile à fixer au bras":
            "Shaft difficult to attach to the arm",

        "Nous avions de la difficulté à fixer solidement le bras à son axe, ce qui causait une rotation indésirable. Nous avons modifié l’axe pour lui donner une forme de D‑shaft, améliorant la transmission du couple et l’adhérence mécanique.":
            "We had difficulty securely attaching the arm to its shaft, causing unwanted rotation. We modified the shaft to give it a D‑shaft shape, improving torque transmission and mechanical grip.",

        "Axe de moteur plié":
            "Bent motor shaft",

        "À la suite d’une chute accidentelle du robot depuis sa station de réparation, un axe de moteur s’est plié. Grâce à un étau, un peu d’huile de coude et beaucoup d’ingéniosité, nous avons pu le redresser et remettre le moteur en état. Résultat : +100 $ !":
            "After the robot accidentally fell from its repair station, a motor shaft bent. With a vise, some elbow grease, and a lot of ingenuity, we managed to straighten it and restore the motor to working condition. Result: +$100!",

        "Force de prise insuffisante des pinces":
            "Insufficient gripping force of the grippers",

        "Depuis la compétition de l’an dernier, notre équipe éprouve des difficultés à obtenir une force de prise suffisante. Cette année, le problème était amplifié par la masse des bobines et l’amplitude des mouvements requis. Nous avons donc abandonné les pinces directement attachées à un servomoteur et opté pour un système de transformation du mouvement par pignon et crémaillère. Cette solution permet d’échanger de la vitesse contre de la force, ce qui s’est avéré particulièrement efficace et rentable pour notre application.":
            "Since last year’s competition, our team has struggled to achieve sufficient gripping force. This year, the problem was amplified by the weight of the coils and the range of motion required. We therefore abandoned grippers directly attached to a servomotor and opted for a rack‑and‑pinion motion‑conversion system. This solution trades speed for force, which proved particularly effective and efficient for our application.",


        /* ===== VIDÉO ===== */
        "Tutoriel":
            "Tutorial",

        "Le tutoriel explique comment imprimer des pièces 3D qui ne se casseront (presque) jamais. Cela est particulièrement nécessaire pour la CRC, où les robots sont soumis à un stress constant. \nIl aborde en profondeur presque toutes les raisons qui peuvent affaiblir les pièces imprimées en 3D et transmet ces informations avec un mélange d’humour et de pédagogie. \nLe tutoriel est réalisé entièrement sur After Effects et DaVinci Resolve, et a été enregistré sur Fusion, Qidi Slicer, ainsi qu’en conditions réelles.":
            "The tutorial explains how to print 3D parts that will (almost) never break. This is especially important for CRC, where robots are under constant stress.\nIt explores in depth almost all the reasons that can weaken 3D‑printed parts and conveys this information with a mix of humor and pedagogy.\nThe tutorial was made entirely in After Effects and DaVinci Resolve, and recorded in Fusion, Qidi Slicer, as well as in real‑world conditions.",

        "La compétition CRC":
            "The CRC competition",

        "Notre projet de vidéo met en scène un robot qui se voit chargé de ce rendre à la compétition de la CRC le plus vite possible pour pouvoir assister son équipe. La vidéo a été réalisée entièrement à l'ordinateur avec le logiciel de création 3D libre et open source BLENDER et avec l'outil de compositing NUKE.":
            "Our video project features a robot tasked with getting to the CRC competition as quickly as possible to support its team. The video was created entirely on computer using the free and open‑source 3D creation software BLENDER and the compositing tool NUKE.",

        "L'équipe espère que vous avez eu un beau voyage et nous  espèrons que vous allez continuer à rêver grand ! ! !":
            "The team hopes you had a great journey and that you will continue to dream big!!!",


        /* ===== FOOTER ===== */
        "Vie privée":
            "Privacy",

        "Conditions":
            "Terms",

        "© 2025 Robotique BdeB":
            "© 2025 BdeB Robotics",
        "L'équipe de robotique de Bois-de-Boulogne est composée d'étudiants passionnés de robotique et de technologie. Ils ont travaillé fort cette année 2025-2026 pour vous offrir le meilleure spectacle.":"The Bois-de-Boulogne robotics team is made up of students who are passionate about robotics and technology. They worked hard during the 2025–2026 year to offer you the best show.",
        "Bob est le bolide d'Émilien, ne vous fiez pas à l'apparence, il va faire mordre la poussière à ses compétiteurs. Son robotest venu pour gagner.":"Bob is a powerful racer. Don’t be fooled by its appearance — it’s going to leave its competitors in the dust. This robot is here to win.",
        "L'équipe espère que vous avez eu un beau voyage et nous espèrons que vous allez continuer à rêver grand ! ! !":"The team hopes you had a wonderful trip, and we hope you’ll continue to dream big!",
        "Le tutoriel explique comment imprimer des pièces 3D qui ne se casseront (presque) jamais. Cela est particulièrement nécessaire pour la CRC, où les robots sont soumis à un stress constant. Il aborde en profondeur presque toutes les raisons qui peuvent affaiblir les pièces imprimées en 3D et transmet ces informations avec un mélange d’humour et de pédagogie. Le tutoriel est réalisé entièrement sur After Effects et DaVinci Resolve, et a été enregistré sur Fusion, Qidi Slicer, ainsi qu’en conditions réelles.":"The tutorial explains how to print 3D pieces that will almost or never break. It is particularly useful in the context of the CRC competition where 3D parts on the robot are subjected to a constant, and great stress. The tutorial also covers most of the flaws of 3D printing that make a printed piece less resistant. All that information is conveyed with a mix of humor, and pedagogy. Finally, it has been completely created on After Effects, and Davinci Resolve. It has been recorded on Fusion, Qidi Slicer, and in real conditions",
        "Malgré les nombreux travaux entrepris dans le collège et le fait que l'administration ne sache pas ou mettre les étudiant(e)s, le club a hérité d'un nouveau local. Nous sommes content(e)s de cette acquisition.":"Despite the many construction projects underway at the college and the administration not knowing where to place the students, the club ended up with a new room. We’re happy with this new space.",
        "Ce kiosque était une vraies joke. On a dû le démonter et le remonter plusieurs fois. la première fois parce que c'était le thème de l'année passée et nous devions vérifier les dimensions. En remontant le kiosque, on a découvert que les morceaux de mdf n'étaient pas réutilisables. Martin et ses coéquipiers sont donc allés chercher des planches de remplacement. On a dû démonter et remonter le kiosque une fois de plus. Le projet a été un vrai casse-tête, mais l'équipe a réussi à le terminer à temps.":"This booth was a real joke. We had to take it apart and rebuild it several times. The first time was because it used last year’s theme, and we needed to check the dimensions. While putting the booth back together, we discovered that the MDF pieces couldn’t be reused. Martin and his teammates went to get replacement boards. Then we had to take the booth apart and rebuild it once again. The project was a real puzzle, but the team managed to finish it on time.",
        "pleusieur versions pour Bob":"Multiple version of Bob",
        "Cette année Bob a connu deux versions différentes. La première version était une version de base, et la deuxième version a été améliorée avec des fonctionnalités supplémentaires il a eu des problémes de moteur et d'équilibre mais l'équipe a réussi à les corrigers.": "This year, Bob went through two different versions. The first one was a basic model, and the second was upgraded with additional features He had some motor and balance issues, but the team managed to fix them.",
        "Les cônes sont partout":"The cones are everywhere.",
        "Votre première arrêt consiste à découvrir le chemin chargé de cônes oranges qu'on a dû parcourir pour arriver à la compétition CRC. On vous rassure, que nous avons eu du plaisir.":"Your first stop is to discover the cone‑filled path we had to navigate to get to the CRC competition. Don’t worry — we still had fun along the way.",
        "Découvrez l'équipe !":"Discover the team",
        "L'équipe de robotique de Bois de Boulogne est composée d'étudiants passionnés de robotique et de technologie, ont travaillé fort cette année 2025-2026 pour vous offrir le meilleure spectacle":"The Bois‑de‑Boulogne robotics team is made up of students who are passionate about robotics and technology, and they worked hard this 2025–2026 year to offer you the best show.",
        "Bob est le bolide de Émilien ne vous fiez pas à l'apparence, il va faire mordre la poussière à ses compétiteurs. il est venue pour gagner.":"Bob is Émilien’s racer. Don’t be fooled by its appearance — it’s going to leave its competitors in the dust. It came here to win.",
        "Châssis":"Frame",
        "L’ascenseur permet le déplacement vertical du bras à l’aide d’un système de chaîne et de roues dentées. Le choix d’une chaîne, plutôt qu’une courroie, permet d’éviter les problèmes de retensionnement liés à la fatigue du matériau. À la base de l’ascenseur se trouve un interrupteur de position servant à calibrer la position initiale du bras. Ce dispositif empêche le pilote de déplacer le bras au-delà de ses limites mécaniques, réduisant ainsi les risques de bris lors de l’opération.":
            "The elevator allows vertical movement of the arm using a chain and sprocket system. Choosing a chain rather than a belt helps avoid retensioning issues related to material fatigue.",
        "Bras ":"Arm",
        "Nouvelle année, nouveau locaux ! ":"New years, new place",
        "Le châssis constitue la base d’un robot fiable et performant. Le nôtre est entièrement boulonné afin d’assurer une structure à la fois droite, rigide et légère. Nous avons opté pour des roues omnidirectionnelles, ce qui permet une navigation fluide et précise sur un terrain plat. Les roues sont protégées par des profilés en aluminium 2020 et maintenues droites à leurs extrémités grâce à des roulements à billes, ce qui réduit les frottements et améliore la durabilité. Un espace a été réservé à l’arrière du châssis pour accueillir la batterie et le CRCStop, les rendant facilement accessibles pour des raisons de sécurité et de maintenance.":"The chassis forms the foundation of a reliable and high-performance robot. Ours is fully bolted together to ensure a structure that is straight, rigid, and lightweight. We chose omnidirectional wheels, allowing smooth and precise navigation on flat terrain. The wheels are protected by 2020 aluminum profiles and kept aligned at their ends using ball bearings, which reduces friction and improves durability. Space was reserved at the rear of the chassis to house the battery and the CRCStop, making them easily accessible for safety and maintenance purposes.",
        "Le bras du robot est constitué d’une extrusion en aluminium capable de tourner sur lui-même à l’aide d’un moteur. L’axe central qui le supporte traverse deux roulements à billes, ce qui permet de minimiser le jeu mécanique tout en maximisant la solidité et la stabilité du système lors des mouvements rapides ou sous charge.":"The robot’s arm is made of an aluminum extrusion capable of rotating on itself using a motor. The central shaft that supports it passes through two ball bearings, which helps minimize mechanical play while maximizing the system’s strength and stability during fast movements or under load.",
        "L'équipe qui a travaillé sur Bob cette année 2025-2026 est fier de vous présenter son robot final.":"The team that worked on Bob during the 2025–2026 season is proud to present its final robot.",
        "Cette année, nos pinces utilisent un système de pignon et crémaillère afin de maximiser la force de prise. Elles sont actionnées par des servomoteurs, ce qui permet de réduire la masse totale présente sur le bras. Pour améliorer l’adhérence sur les objets manipulés, nous utilisons de l’Alien Tape™, qui constitue notre solution clé pour éviter les glissements. Les pinces sont positionnées aux extrémités opposées du bras, assurant un contrepoids constant lors de la rotation du bras sur lui-même. De plus, elles sont orientées à 90° l’une de l’autre, ce qui permet d’attraper efficacement les bobines, qu’elles soient debout ou à plat, selon leur profil.":"This year, our grippers use a rack-and-pinion system to maximize gripping force. They are actuated by servomotors, which helps reduce the total mass carried by the arm. To improve grip on handled objects, we use Alien Tape™, our key solution to prevent slipping. The grippers are positioned at opposite ends of the arm, ensuring a constant counterweight as the arm rotates around its axis. Additionally, they are oriented 90° relative to each other, allowing efficient handling of coils whether they are upright or lying flat, depending on their profile.",
        "Avantage: Avec seulement 4 points de contact, la prise est plus constante, peu importe la position initiale de la GP. Désavantage: On arrive à la date limite de la remise du site web. Si vous voulez en savoir plus, n’hésitez pas à passer nous voir durant la compétition !":"Avantage: Avec seulement 4 points de contact, la prise est plus constante, peu importe la position initiale de la GP.\n" +
            "Désavantage: On arrive à la date limite de la remise du site web. Si vous voulez en savoir plus, n’hésitez pas à passer nous voir durant la compétition !",
        "Avantage : Avec seulement 4 points de contact, la prise est plus constante, peu importe la position initiale de la GP.":"Advantage: With only four contact points, the grip remains consistent regardless of the GP’s initial position.",
        "Nous avions de la difficulté à fixer solidement le bras à son axe, ce qui causait une rotation indésirable autour de celui-ci. Pour résoudre ce problème, nous avons modifié l’axe afin de lui donner une forme de D-shaft, améliorant ainsi la transmission du couple et l’adhérence mécanique.":"We initially had difficulty securely fixing the arm to its shaft, which caused unwanted rotation around it. To solve this issue, we modified the shaft into a D-shaft shape, improving torque transmission and mechanical grip.",
        "À la suite d’une chute accidentelle du robot depuis sa station de réparation (deux tabourets), un axe de moteur s’est plié. Grâce à un étau, un peu d’huile de coude et beaucoup d’ingéniosité, nous avons pu redresser l’axe et remettre le moteur en état de fonctionnement. Résultat : +100$ !":"Following an accidental drop of the robot from its repair station (two stools), a motor shaft was bent. Using a vise, some elbow grease, and a lot of ingenuity, we managed to straighten the shaft and restore the motor to working condition. Result: $100 saved.",
        "Bras":"Arms",
    };



// 🟦 2. Fonction de traduction avec nettoyage des espaces
    function translatePage(lang) {
        const elements = document.querySelectorAll("[data-translate]");

        elements.forEach(el => {
            if (["IMG", "A", "I"].includes(el.tagName)) return;

            const rawText = el.dataset.original || el.textContent.trim();
            const normalized = rawText.replace(/\s+/g, " ");

            if (!el.dataset.original) {
                el.dataset.original = normalized;
            }

            if (lang === "fr") {
                el.textContent = el.dataset.original;
                return;
            }

            if (translations[normalized]) {
                el.textContent = translations[normalized];
            }
        });
    }

// setlanguage
    function setLanguage(lang) {
        localStorage.setItem("lang", lang);
        translatePage(lang);
    }

// domcontentloaded    
    document.addEventListener("DOMContentLoaded", () => {
        const savedLang = localStorage.getItem("lang") || "fr";
        translatePage(savedLang);

        document.querySelectorAll("#language-switcher button").forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(btn.dataset.lang)
                setLanguage(btn.dataset.lang);
            });
        });
    });