'use strict';

// regex if following
// anywords.anywords-a2016@fh-salzburg.ac.at
// also captures just @fh-salzburg.ac.at if the rest is not valid
// (Group 1). optional group from start until @ (excluding @) with following syntax: anywords.anywords-a2016@
// Group 2. any words (e.g. mmt)
// Group 3. one letter, master or bachelor (e.g. m)
// Group 4. the years with 4 digits (e.g. 2016)
// Group 5. the email adress of fh-salzburg.ac.at
const re = /(\w+\.(\w+)-(\w{1})(\d{4}))?@(fh-salzburg\.ac\.at)/g;

export function valid (email, focusEmail=false) {
    const regex = new RegExp(re);
    const execEmail = regex.exec(email);

    // fail fast no match
    if (!execEmail) {
        return false
    }

    // is the email valid? Group 5.
    if (execEmail[5]) {
        // just return true if JUST the emaildomain must be valid
        if (focusEmail && !execEmail[1]) {
            return true;
        }

        if (execEmail[1]) {
            return true;
        }
    }

    return false;
}

export function degreeProgram (email) {
    const regex = new RegExp(re);
    const execEmail = regex.exec(email);

    // fail fast no match
    if (!execEmail) {
        return {
            code: 'ENOSTUDY'
        }
    }

    // just fail if the emaildomain is valid
    if (!execEmail[1] && execEmail[5]) {
        return {
            code: 'EUNSURE'
        }
    }

    if (execEmail[2]) {
        return execEmail[2].toUpperCase();
    }

    return false
}

export function level (email) {
    const regex = new RegExp(re);
    const execEmail = regex.exec(email);

    // fail fast no match
    if (!execEmail) {
        return {
            code: 'ENOSTUDY'
        }
    }

    // just fail if the emaildomain is valid
    if (!execEmail[1] && execEmail[5]) {
        return {
            code: 'EUNSURE'
        }
    }

    if (execEmail[3]) {
        let result;

        switch(execEmail[3]) {
            case 'b': result = 'BA'
            break;

            case 'm': result = 'MA'
            break;

            default: result = ''
        }

        return result;
    }

    return false;
}

export function graduationYear (email) {
    const regex = new RegExp(re);
    const execEmail = regex.exec(email);

    // fail fast no match
    if (!execEmail) {
        return {
            code: 'ENOSTUDY'
        }
    }

    // just fail if the emaildomain is valid
    if (!execEmail[1] && execEmail[5]) {
        return {
            code: 'EUNSURE'
        }
    }

    if (execEmail[4]) {
        let yearsUntilEnd = parseInt(execEmail[4]);

        switch (this.level(email)) {
            case 'MA': yearsUntilEnd += 2
            break;

            case 'BA': yearsUntilEnd += 3
        }

        return yearsUntilEnd
    }
}
