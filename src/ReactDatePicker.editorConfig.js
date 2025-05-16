/**
 * @typedef Property
 * @type {object}
 * @property {string} key
 * @property {string} caption
 * @property {string} description
 * @property {string[]} objectHeaders
 * @property {ObjectProperties[]} objects
 * @property {Properties[]} properties
 */

/**
 * @typedef ObjectProperties
 * @type {object}
 * @property {PropertyGroup[]} properties
 * @property {string[]} captions
 */

/**
 * @typedef PropertyGroup
 * @type {object}
 * @property {string} caption
 * @property {PropertyGroup[]} propertyGroups
 * @property {Property[]} properties
 */

/**
 * @typedef Properties
 * @type {PropertyGroup}
 */

/**
 * @typedef Problem
 * @type {object}
 * @property {string} property
 * @property {("error" | "warning" | "deprecation")} severity
 * @property {string} message
 * @property {string} studioMessage
 * @property {string} url
 * @property {string} studioUrl
 */

/**
 * @param {object} values
 * @param {Properties} defaultProperties
 * @param {("web"|"desktop")} target
 * @returns {Properties}
 */
export function getProperties(values, defaultProperties, target) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */
    return defaultProperties;
}

// /**
//  * @param {Object} values
//  * @returns {Problem[]} returns a list of problems.
//  */
// export function check(values) {
//    /** @type {Problem[]} */
//    const errors = [];
//    // Add errors to the above array to throw errors in Studio and Studio Pro.
//    /* Example
//    if (values.myProperty !== "custom") {
//        errors.push({
//            property: `myProperty`,
//            message: `The value of 'myProperty' is different of 'custom'.`,
//            url: "https://github.com/myrepo/mywidget"
//        });
//    }
//    */
//    return errors;
// }

// /**
//  * @param {object} values
//  * @param {boolean} isDarkMode
//  * @param {number[]} version
//  * @returns {object}
//  */
const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" stroke="black" stroke-width="2" class="react-date-picker__calendar-button__icon react-date-picker__button__icon"><rect fill="none" height="15" width="15" x="2" y="2"></rect><line x1="6" x2="6" y1="0" y2="4"></line><line x1="13" x2="13" y1="0" y2="4"></line></svg>`;
const calendarIconDark = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" stroke="#8E8E8E" stroke-width="2" class="react-date-picker__calendar-button__icon react-date-picker__button__icon"><rect fill="none" height="15" width="15" x="2" y="2"></rect><line x1="6" x2="6" y1="0" y2="4"></line><line x1="13" x2="13" y1="0" y2="4"></line></svg>`;

export function getPreview(values, isDarkMode) {
    return {
        type: "RowLayout",
        borderRadius: 0,
        borderWidth: 0,
        columnSize: "grow",
        children: [
            {
                type: "Container",
                borders: true,
                borderWidth: 1,
                padding: 4,
                children: [
                    {
                        content: `[${values.dateAttr}]`,
                        fontColor: isDarkMode ? "#5596F1" : "#146FF4",
                        fontSize: 9,
                        type: "Text"
                    }
                ],
                grow: 1
            },
            {
                type: "Container",
                backgroundColor: isDarkMode ? "#505050" : "#D9DBDD",
                grow: 0,
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Image",
                                width: 14,
                                height: 14,
                                document: isDarkMode ? calendarIconDark : calendarIcon
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

// /**
//  * @param {Object} values
//  * @param {("web"|"desktop")} platform
//  * @returns {string}
//  */
// export function getCustomCaption(values, platform) {
//     return "MultiLevelDropdown";
// }
