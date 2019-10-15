
const lists = [
    {
        title: 'Switch games',
        url: 'wishliste.com/123oprjfusbrg',
        description: 'I need more GAMES!',
        items: [
            {
                id: 1,
                name: "Fire Emblem: Three Houses",
                description: "Newest Fire Emblem. Gotta have.",
                checked: true
            },
            {
                id: 2,
                name: "Disgaea 5",
                description: "Gotta have for my collection.",
                checked: true
            },
            {
                id: 3,
                name: "Pokemon Sword",
                description: "Gotta have for my collection.",
                checked: false
            }

        ]
    }
];

export function getLists(){
    return lists;
};

export function getList(url){
    return lists.find(l => l.url === url);
};