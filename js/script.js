document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Scroll Effects
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.header__mobile-btn');
    const navLinks = document.querySelector('.header__nav-list');
    const hamburger = document.querySelector('.header__hamburger');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('header__nav-list--active');
            hamburger.classList.toggle('header__hamburger--active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.header__nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('header__nav-list--active')) {
                navLinks.classList.remove('header__nav-list--active');
                hamburger.classList.remove('header__hamburger--active');
            }
        });
    });

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
        // Remove hardcoded active class from HTML setup
        link.classList.remove('header__nav-link--active');
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('header__nav-link--active');
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('reveal--active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Modal / Lightbox Logic for Guide Page
    const modalOverlay = document.getElementById('metaModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalImg = document.getElementById('modalImg');
    const modalRegion = document.getElementById('modalRegion');
    const modalText = document.getElementById('modalText');
    const modalTipText = document.getElementById('modalTipText');
    const modalTipBox = document.querySelector('.modal__tip');

    // Data for metas (localized in Czech)
    const metaData = {
        'sun': {
            title: 'SUN META',
            region: 'Příklady: Severní vs. Jižní polokoule',
            goodFor: 'Skvělé pro odlišení Evropy a USA od Austrálie, Jižní Ameriky a Jižní Afriky. Blízko rovníku je to méně spolehlivé, ale stále je to naprosto klíčová meta pro začátečníky.',
            text: 'Poloha slunce na obloze je ta největší a nejlepší nápověda, kterou ve hře máte zdarma. Protože slunce se pohybuje nad rovníkem, jeho poloha vám okamžitě prozradí, na které polokouli se nacházíte. Pokud se podíváte na slunce a kompas ukazuje, že je na jihu, nacházíte se na severní polokouli (např. Evropa, Severní Amerika nebo Japonsko). Pokud slunce leží na severu, jste zaručeně na jižní polokouli (např. Austrálie, Jižní Amerika, Nový Zéland nebo Jižní Afrika). Tento jednoduchý trik dokáže okamžitě vyřadit polovinu světa.',
            tip: 'Vždy nejdříve zkontrolujte herní kompas! Pokud je obloha zatažená a slunce není vidět přímo, hledejte stíny – podívejte se pod stromy, značky nebo auta. Kam míří stín, tam je opačná strana od slunce. <strong>Pozor na chytáky:</strong> Blízko rovníku (např. Indonésie, Kolumbie, Ekvádor) může být slunce často přímo nad hlavou, případně mírně odkloněné na stranu podle ročního období, což určování polokoule velmi ztěžuje.'
        },
        'drive-side': {
            title: 'STRANA ŘÍZENÍ',
            region: 'Jezdí vlevo: UK, Irsko, Austrálie, N. Zéland, J. Afrika, Indie, Indonésie, Japonsko, Thajsko.',
            goodFor: 'Toto je jedna z nejsilnějších met pro okamžité vyřazení celých kontinentů. Jakmile vidíte levostranný provoz, můžete zapomenout na celou Ameriku a většinu Evropy.',
            text: 'Zatímco většina světa (včetně České republiky, USA či celé Jižní Ameriky) jezdí vpravo, existuje úzká a velmi specifická skupina zemí, která jezdí vlevo. Patří mezi ně především bývalé britské kolonie. Znalost levostranného provozu je extrémně silná pomůcka, která zúží váš výběr jen na pár konkrétních zemí. Pokud vidíte auto jet vlevo, nacházíte se pravděpodobně ve Velké Británii, Irsku, Jižní Africe, Austrálii, na Novém Zélandu, v Indii, Indonésii, Japonsku nebo Thajsku.',
            tip: 'Pokud je silnice prázdná a chybí auta v pohybu, hledejte jiné stopy: Kde jsou auta zaparkovaná a jakým směrem stojí? Na kterou stranu ulice jsou otočené dopravní značky? Kde má zaparkované auto volant (volant bývá na straně blíž středu vozovky)? <strong>Varování:</strong> Na jednosměrkách může být určení matoucí, proto vždy hledejte více důkazů.'
        },
        'lines': {
            title: 'ČÁRY NA SILNICI',
            region: 'Příklady: Amerika, Afrika, Asie vs. Evropa',
            goodFor: 'Velmi nedoceněná a začátečnicky přívětivá meta. Žluté středové čáry rychle oddělí USA, Kanadu, Latinskou Ameriku, Jižní Afriku a část Asie od zbytku Evropy, kde převládají bílé.',
            text: 'Barva čar na silnici je jedním z prvních detailů, kterých byste si měli všimnout hned po slunci. Rozdělení je velmi překvapivě konzistentní: V Severní a Jižní Americe se jako středová čára oddělující protijedoucí pruhy používá téměř výhradně žlutá barva. Naproti tomu v Evropě jsou středové i postranní čáry většinou bílé. Pokud tedy vidíte dvojitou žlutou čáru uprostřed cesty, s obrovskou pravděpodobností jste někde na americkém kontinentu nebo v určitých asijských státech (jako je Japonsko).',
            tip: 'Kromě středových čar si všímejte i čar na krajnici. Například Jižní Afrika nebo Izrael jsou známé žlutými postranními čárami. <strong>Výjimky:</strong> Žluté středové čáry najdete občas i v Norsku a Finsku kvůli viditelnosti ve sněhu. Naopak Chile je výjimečnou zemí v Jižní Americe, která primárně používá čistě bílé čáry.'
        },
        'language': {
            title: 'JAZYKY A ABECEDY',
            region: 'Příklady: Evropa, Asie, Jižní Amerika',
            goodFor: 'Pomůže rozeznat Cyrilici (azbuku), Španělštinu/Portugalštinu, polská speciální písmena, maďarská, balkánské, české a slovenské znaky nebo skandinávská písmena.',
            text: 'Schopnost rozpoznat základní znaky a písmena z různých koutů světa vám obrovsky usnadní orientaci. Jazyk je vůbec nejsilnější nástroj, pokud na nějaký text narazíte. Vidíte-li například azbuku (cyrilici), nacházíte se s největší pravděpodobností ve východní Evropě, Rusku nebo některých zemích střední Asie (např. Kyrgyzstán). Unikátní písmena jako ø a æ vás naopak jasně nasměrují do Skandinávie. Setkáte-li se se španělštinou či portugalštinou (například typické ã s vlnovkou nebo ç), hledáte s velkou jistotou v Jižní Americe nebo na Pyrenejském poloostrově.',
            tip: 'Nemusíte daný jazyk umět plynule číst ani mu rozumět. Bohatě stačí vnímat jeho vizuální styl. Všimnete-li si například nápisů s velkým množstvím háčků a čárek (ř, č, š, ž), s vysokou pravděpodobností jste v Česku, na Slovensku nebo na Balkáně. Maďarština je zase typická častým používáním kombinací "sz" a dlouhých samohlásek (ő, ű).<br><br><small>Toto je pouze základní verze. Pokročilejší rozdělení najdeš v doporučených <a href="resources.html" style="color:var(--secondary-color); text-decoration:underline;">zdrojích</a>.</small>'
        },
        'plates': {
            title: 'POZNÁVACÍ ZNAČKY (SPZ)',
            region: 'Příklady: Evropa, Amerika, specifické země',
            goodFor: 'Dlouhé značky s modrým pruhem znamenají EU. Krátké značky najdeš spíše v Americe. Žluté zadní značky mají specifické země.',
            text: 'Přestože Google v aplikaci Street View poznávací značky (SPZ) kvůli ochraně soukromí rozmazává, jejich základní tvar, rozměr a barvu lze stále velmi snadno určit. Tyto proporce tvoří vynikající nápovědu! Evropská auta mají většinou velmi dlouhé a úzké značky, které na levé straně obsahují charakteristický vertikální modrý pruh (znak Evropské unie). Pokud vidíte tento pruh, jste zaručeně v Evropě. Oproti tomu americká auta používají velmi krátké, zavalité a často více barevné značky bez postranních pruhů.',
            tip: 'Barva značek prozradí konkrétní zemi! Nizozemsko a Lucembursko používají výrazné žluté značky vpředu i vzadu. Velká Británie používá bílou značku vpředu a žlutou vzadu. <strong>Omezení:</strong> Dejte si pozor na státy jako Itálie, které mají sice dlouhou EU značku, ale modré pruhy má na obou stranách (levé i pravé), což z ní dělá specifickou a jedinečnou nápovědu.'
        },
        'bollards': {
            title: 'PATNÍKY U SILNICE (BOLLARDS)',
            region: 'Příklady: Evropa, Asie, Oceánie, Latinská Amerika',
            goodFor: 'Například bílo-černé styly (Německo/Rakousko), červený pruh (Polsko), odrazky (Česko/Slovensko), oranžové odrazky (Japonsko) nebo speciální sloupky v Austrálii.',
            text: 'Malé patníky a odrazky podél silnic patří mezi nejoblíbenější "meta clues" mezi pokročilými hráči. Téměř každý stát nebo region vyvinul svůj vlastní unikátní styl patníků kvůli lokálním normám. Protože jsou patníky přítomny téměř všude – na rovinkách, v lesích, v horách i na venkově – představují absolutně spolehlivý klíč k určení přesné země, zejména v Evropě, kde jsou rozdíly velmi zřetelné. Naučit se poznat alespoň deset základních evropských patníků vám zaručeně vyhraje mnoho těžkých kol v lesní pustině.',
            tip: 'Detailní rozdíly hledejte v barvě samotného plastu (zda je patník celý bílý, nebo má černé prvky), v tvaru odrazky (zda jde o tenký svislý obdélník, vodorovný proužek, nebo malé kolečko) a v barvě odrazky (bílá, oranžová, červená). Například Polsko používá bílé patníky s výrazným tlustým červeným pruhem kolem dokola. Francie má zase na patnících často velký bílý plastový klobouček s červeným reflexním obdélníkem.<br><br><small>Toto je pouze základní verze. Pokročilejší rozdělení najdeš v doporučených <a href="resources.html" style="color:var(--secondary-color); text-decoration:underline;">zdrojích</a>.</small>'
        },
        'poles': {
            title: 'ELEKTRICKÉ SLOUPY',
            region: 'Příklady: Japonsko, Severní a Jižní Amerika, Evropa',
            goodFor: 'Husté chaotické sloupy a transformátory (Japonsko), dřevěné sloupy s křížem (USA/Kanada), betonové s dírami (Balkán, Latinská Amerika).',
            text: 'Podobně jako patníky, i sloupy elektrického vedení mají svůj lokální charakter. Infrastruktura se staví z materiálů a podle norem typických pro danou zemi. Sloupy jsou užitečné zejména při zkoumání venkovských a opuštěných silnic na třetím světě nebo v hluboké přírodě, kde nenajdete žádný psaný text ani poznávací značky. Zkoumání materiálů, tvarů izolátorů a množství kabelů dokáže často jednoznačně určit stát či celý region.',
            tip: 'Soustřeďte se primárně na materiál. USA a Kanada používají téměř vždy masivní dřevěné sloupy. Naproti tomu Latinská Amerika a státy jako Rumunsko či Maďarsko často používají betonové sloupy s charakteristickými čtvercovými dírami (vypadají jako žebříky). Japonsko je absolutně legendární svým chaotickým spletencem silných kabelů, výstražným žlutočerným obložením spodku sloupu a mnoha transformátory namotanými na sloupech u silnic.<br><br><small>Toto je pouze základní verze. Pokročilejší rozdělení najdeš v doporučených <a href="resources.html" style="color:var(--secondary-color); text-decoration:underline;">zdrojích</a>.</small>'
        },
        'car': {
            title: 'GOOGLE AUTO A KAMERA',
            region: 'Příklady: Keňa, Ghana, Jižní Amerika, Mongolsko',
            goodFor: 'Černá nebo bílá kapota, šnorchl typický pro Keňu, střešní nosič s páskou v Ghaně. Generace a kvalita kamery (Halo effect, starý rozmazaný obraz).',
            text: 'Říká se tomu "Car meta". Google Street View se snímá pomocí reálných aut, a ty se v různých částech světa liší. Často byly různé africké, asijské či jihoamerické státy mapovány specifickými modely aut. Pokud se v těchto oblastech podíváte dolů přímo pod sebe, často uvidíte část přední kapoty, zadní nárazník, střešní antény nebo stíny samotného vybavení kamery. Tohle tvoří zcela exaktní klíč. Každé takto unikátní auto prozrazuje přesnou zemi, ve které zrovna probíhalo focení mapy.',
            tip: 'Zdaleka nejznámější je takzvaný Keňský šnorchl (Kenya snorkel) – masivní černá trubka sání motoru vyčnívající z pravé přední části vozu, určená pro brodění řek. V africké Ghaně zase uvidíte čtyři trubky střešního nosiče s charakteristickou černou lepicí páskou na jedné z nich. V Peru nebo Chile můžete často narazit na specificky černé či bílé barvy kapoty. <strong>Varování:</strong> Google flotila se neustále aktualizuje a stará auta jsou na novějších snímcích nahrazována, proto by car meta neměla být vaší jedinou nápovědou.<br><br><small>Toto je pouze základní verze. Pokročilejší rozdělení najdeš v doporučených <a href="resources.html" style="color:var(--secondary-color); text-decoration:underline;">zdrojích</a>.</small>'
        }
    };

    const openModal = (id, imgSrc) => {
        const data = metaData[id];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalImg.src = imgSrc;
        modalRegion.textContent = data.region;
        modalText.textContent = data.text;
        
        const goodForEl = document.getElementById('modalGoodFor');
        const goodForTextEl = document.getElementById('modalGoodForText');
        if (goodForEl && goodForTextEl && data.goodFor) {
            goodForTextEl.textContent = data.goodFor;
            goodForEl.style.display = 'block';
        } else if (goodForEl) {
            goodForEl.style.display = 'none';
        }
        
        if (data.tip) {
            modalTipText.innerHTML = data.tip;
            modalTipBox.style.display = 'block';
        } else {
            modalTipBox.style.display = 'none';
        }

        modalOverlay.classList.add('modal--active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling underneath
    };

    const closeModal = () => {
        modalOverlay.classList.remove('modal--active');
        document.body.style.overflow = '';
    };

    // Attach click events to all meta cards
    const metaCards = document.querySelectorAll('.meta-card');

    metaCards.forEach(card => {
        const btn = card.querySelector('.btn');
        const img = card.querySelector('.meta-card__img');
        const metaId = card.getAttribute('data-meta');

        if (btn && metaId && img) {
            const handler = (e) => {
                e.preventDefault();
                openModal(metaId, img.src);
            };
            btn.addEventListener('click', handler);
            img.addEventListener('click', handler);
            img.style.cursor = 'pointer';
        }
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('modal--active')) {
            closeModal();
        }
    });
});
