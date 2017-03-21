var user = {
    insert:'INSERT INTO allscores(PlayerName,PlayerScore,MapId) VALUES(?,?,?)',
    queryMap:'SELECT * FROM allscores WHERE MapId = ?',
    changeScore:'UPDATE allscores SET PlayerScore =  ? WHERE MapId = ? AND PlayerName = ?',
    queryAll:'SELECT PlayerName,PlayerScore,MapId FROM allscores',
    procedure:'CALL procedure1(?,?,?)'
};
module.exports = user;