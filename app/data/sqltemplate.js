var mysqlConn = require('../db/mysqlconn');

function SqlRepository(tableName, cols, rest) {
    var result = null;
    var conn = mysqlConn.pool();
    conn.query('SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = "' + tableName + '"', function (err, rows) {
        if (err) throw err;
    
        console.log(rows);
        result = rows;
    });

    if (result === null || result === undefined) {
        var queryStr = 'CREATE TABLE ' + tableName + '( ';

        cols.forEach(col => {
            queryStr = queryStr + col.name + ' ' + col.type;

            if (col.notNull === true) {
                queryStr = queryStr + ' NOT NULL';
            }

            if (col.isPrimary) {
                queryStr = queryStr + ' PRIMARY KEY';
            }

            if (col.isAutoIncrement) {
                queryStr = queryStr + ' AUTO_INCREMENT';
            }

            if (!col.isFinal) {
                queryStr = queryStr + ' ,';
            }
        });

        if (rest !== null && rest !== undefined) {
            queryStr = queryStr + ' ' + rest;
        }

        queryStr = queryStr + ' )';
        conn.query(queryStr, function(err, rows) {

        });

    }
    console.log(queryStr);

    this.tableName = tableName;
    console.log('===========================================');
    console.log(this.tableName);
    console.log('===========================================');
}

SqlRepository.prototype.findAll = function (tableName,conn) {
    var result = null;
    var queryString = 'SELECT * FROM ' + tableName;
    conn.query(queryString, function(error, row,results){
        if (error){
            throw error;
        }else{
            result = row;
        console.log("RESULT :::::::::::: ",row);
        }
    });
    return result;
};

SqlRepository.prototype.findBy = function(tableName,conn, cols) {
    var queryString = 'SELECT * FROM ' + tableName;

    if (cols !== null) {
        queryString = queryString + ' WHERE ';
        cols.forEach(col => {
            queryString = queryString + col.name + ' ' + col.condition;
            queryString = (col.isStringData) ? queryString + '"' + col.value + '" ' : queryString + col.value + ' ';
            if (col.nextCond) queryString = queryString + col.nextCond + ' ';

        });
    }
    console.log("QUERY STRING ::::::::::::: ",queryString);

    return new Promise(() => {
        conn.query(queryString,function(rows,error) {
            if (error) {
                throw error;
            }
            // result = rows;
            console.log("RESULT ROWS 1 ::::::::::::::::::::: ",rows);
            return rows;
        })
    });
    // console.log("RESULT ROWS 2 ::::::::::::::::::::: ",result);
};

SqlRepository.prototype.insert = function(tableName,conn,  cols) {
    var result = null;
    console.log(this.tableName);
    var queryString = 'INSERT INTO ' + tableName + ' (';
    var queryString2 = ' VALUES (';

    cols.forEach(col => {
        queryString = queryString + col.name + ' ,';
        queryString2 = (col.isStringData) ? queryString2 + '"' + col.value + '" ,' : queryString2 + col.value + ' ,';

    });

    queryString = queryString.substring(0, queryString.length - 1) + ')';
    queryString2 = queryString2.substring(0, queryString2.length - 1) + ')';
    console.log(queryString + queryString2);

    conn.query(queryString + queryString2, function(error, rows) {
        if (error) {
            throw error;
        }
        result = rows;
    });

    return result;
};

SqlRepository.prototype.delete = function(tableName,conn, cols) {
    var result = null;
    var queryString = 'DELETE FROM ' + tableName;

    if (cols !== null && cols !== undefined && cols.length > 0) {
        queryString = queryString + ' WHERE ';

        cols.forEach(col => {
            queryString = queryString + col.name + ' ' + col.condition;
            queryString = (col.isStringData) ? queryString + '"' + col.value + '" ' : queryString + col.value + ' ';

            if (col.pastCondition) queryString = queryString + col.pastCondition + ' ';
        });

    }
    conn.query(queryString, function(error, rows) {
        if (error) throw error;

        result = rows;
    });

    return result;
};

SqlRepository.prototype.update = function(tableName,conn, cols, conds) {
    var result = null;
    var queryString = 'UPDATE ' + tableName + ' SET ';

    if (cols !== null && cols !== undefined && cols.length > 0) {

        cols.forEach(col => {
            queryString = queryString + col.name + ' = ';
            queryString = (col.isStringData) ? queryString + '"' + col.value + '" ,' : queryString + col.value + ' ,';
        });

        queryString = queryString.substring(0, queryString.length - 1);
    }

    if (conds !== null && conds !== undefined && conds.length > 0) {
        queryString = queryString + ' WHERE ';

        conds.forEach(col => {
            queryString = queryString + col.name + ' ' + col.condition + ' ' ;
            queryString = (col.isStringData) ? queryString + '"' + col.value + '" ' : queryString + col.value + ' ';
            if (col.pastCondition) queryString = queryString + conds.pastCondition + ' ';
        });
    }
    conn.query(queryString, function(error, rows) {
        if (error) throw error;

        result = rows;
    });

    return result;
};

exports.SqlRepository = SqlRepository;
