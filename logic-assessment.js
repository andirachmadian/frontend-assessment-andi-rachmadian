
export function countCharacterFrequency(text) {
    if (typeof text !== "string") {
        return {};
    }

    const frequency = {};

    for (const character of text.toLowerCase()) {
        if (/[a-z]/.test(character)) {
            frequency[character] = (frequency[character] || 0) + 1;
        }
    }

    return frequency;
}

export function processUserData(users) {
    if (!Array.isArray(users) || users.length === 0) {
        return {};
    }

    const validUsers = users.filter(
        (user) =>
            user &&
            typeof user.age === "number" &&
            user.age >= 18 &&
            typeof user.gender === "string" &&
            user.gender.trim() !== ""
    );

    const groupedUsers = validUsers.reduce((groups, user) => {
        const gender = user.gender.toLowerCase();

        if (!groups[gender]) {
            groups[gender] = [];
        }

        groups[gender].push(user);

        return groups;
    }, {});

    const result = {};

    for (const [gender, genderUsers] of Object.entries(groupedUsers)) {
        const totalAge = genderUsers.reduce(
            (total, user) => total + user.age,
            0
        );

        result[gender] = {
            count: genderUsers.length,
            averageAge: Number((totalAge / genderUsers.length).toFixed(1)),
            users: [...genderUsers],
        };
    }

    return result;
}


