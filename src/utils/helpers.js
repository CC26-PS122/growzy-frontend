export const getMoodIcon = (log) => {
    return log?.mood_types?.default_expression_asset
        ? log.mood_types.default_expression_asset.replace("public/", "")
        : "images/sleepy_char.svg";
};

