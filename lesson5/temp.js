const users = [
    {id: 2, name: "Lika Beridze"},
    {id: 1, name: "John Johnson"},
    {id: 3, name: "Luka shengelia"},
]

const ids = users.map(user => user.id);
const sortedIds = ids.sort((a, b) => a - b);

const newId = sortedIds.at(-1)+1;