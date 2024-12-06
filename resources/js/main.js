const head = {
    linkAttributes: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/resources/images/favicon/favicon-96x96.png',
            sizes: '96x96'
        },
        {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/resources/images/favicon/favicon.svg'
        },
        {
            rel: 'shortcut icon',
            href: '/resources/images/favicon/favicon.ico'
        },
        {
            rel: 'apple-touch-icon',
            href: '/resources/images/favicon/apple-touch-icon.png',
            sizes: '180x180'
        },
        {
            rel: 'manifest',
            href: '/resources/images/favicon/site.webmanifest'
        }
    ],
    addFavicon: function() {
        this.linkAttributes.forEach(item => {
            const link = document.createElement('link');
            link.rel = item.rel;
            link.href = item.href;
            if (item.type) link.type = item.type;
            if (item.sizes) link.sizes = item.sizes;
            document.head.appendChild(link);
        });
    },
    addStyleSheet: function() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/resources/css/style.css';
        document.head.appendChild(link);
    }
};

const header = {
    createHeader: function() {
        const header = document.createElement('header');
        document.body.insertBefore(header, document.querySelector('main'));
    }
};

const footer = {
    createFooter: function() {
        const footer = document.createElement('footer');
        document.body.appendChild(footer);
    }
};

const games = {
    list: [
        {title: `Madame Fox's Fortune Telling`, link: '/games/fortune-teller.html'}
    ],
    createList: function() {
        const gamesList = document.getElementById('games-list');
        this.list.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.link;
            a.textContent = item.title;
            a.classList.add('games-list__link');
            gamesList.appendChild(li);
            li.appendChild(a);
        });
    }
}

head.addFavicon();
head.addStyleSheet();
header.createHeader();
footer.createFooter();

if (document.getElementById('games-list')) games.createList();