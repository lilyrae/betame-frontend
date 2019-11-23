const everyone = 1;
const teen = 2;
const mature = 3;
const explicit = 4;
const none = 5;

export default {
    all() {
        return [
            {
                label: 'Suitable for Everyone',
                shortLabel: 'Everyone',
                value: everyone
            },
            {
                label: 'Teenagers and Above (unsuitable for audiences under 13)',
                shortLabel: 'Teen +',
                value: teen
            },
            {
                label: 'Mature (adult themes e.g. sex, violence etc.)',
                shortLabel: 'Mature',
                value: mature
            },
            {
                label: 'Explicit (e.g. graphic sex, graphic violence etc.)',
                shortLabel: 'Explicit',
                value: explicit
            },
            {
                label: 'Not Rated (treated the same as explicit)',
                shortLabel: 'Not Rated',
                value: none
            }
        ]
    },
    get(value) {
        let all = this.all();
        for (let index = 0; index < all.length; index++) {
            if (all[index].value === value) {
                return all[index]
            }
        }
        return null
    },
    requiresWarning(value) {
        return value >= teen;
    },
    isTeen(value) {
        return value === teen;
    }
}