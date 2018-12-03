/*
 * @Author: wangss 
 * @Date: 2018-11-06 17:31:06 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-28 09:39:35
 */

/**
 *
 * 插一条数据 
 * @param {*} model
 * @param {*} conditions
 * @param {*} callback
 */
const addData = (model, conditions, callback) => {
    model.create(conditions, function (err, result) {
        console.log(result,'result');
        if (err) {
            console.log(err);
            callback({
                success: 0,
                flag: "save data fail",
                err: err,
                result: result
            });
        } else {
            console.log('save success');
            callback({
                success: 1,
                flag: "save data success",
                result: result
            });
        }
    })
};

/**
 *
 * 插入多条数据 
 * @param {*} model
 * @param {*} conditionsArr
 * @param {*} callback
 */
const addManyData = (model, conditionsArr, callback)=>{
    model.insertMany(conditionsArr, function (err, result) {
        if (err) {
            console.log(err);
            callback({
                success: 0,
                flag: "save data fail",
                err: err
            });
        } else {
            console.log('save success');
            callback({
                success: 1,
                flag: "save data success"
            });
        }
    })
}

/**
 *
 * 更新数据库中的一个文档而不返回它 
 * @param {*} model
 * @param {*} conditions
 * @param {*} update
 * @param {*} options
 * @param {*} callback
 */
const updateData = (model, conditions, update, options, callback) => {
    model.update(conditions, update, options, function (error, result) {
        if (error) {
            console.log(error);
            callback({
                success: 0,
                flag: "update data fail"
            });
        } else {
            if (result.n != 0) {
                console.log('update success!');
                callback({
                    success: 1,
                    flag: "update data success"
                });
            } else {
                console.log('update fail:no this data!');
                callback({
                    success: 0,
                    flag: 'update fail:no this data!'
                });
            }
        }
    });
};

/**
 *
 * 删除一条数据 
 * @param {*} model
 * @param {*} conditions
 * @param {*} callback
 */
const removeData = (model, conditions, callback) => {

    model.remove(conditions, function (error, result) {
        if (error) {
            console.log(error);
            callback({
                success: 0,
                flag: "remove data fail"
            });
        } else {
            if (result.result.n != 0) {
                console.log('remove success!');
                callback({
                    success: 1,
                    flag: "remove data success"
                });
            } else {
                console.log('remove fail:no this data!');
                callback({
                    success: 0,
                    flag: 'remove fail:no this data!'
                });
            }

        }
    });
};

/**
 * 公共find方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
const findData = (model, conditions, fields, options, callback) => {

    var sort = options.sort == undefined ? {
        _id: -1
    } : options.sort;
    delete options.sort;
    model.find(conditions, fields, options, function (error, result) {
        if (error) {
            console.log(error);
            callback({
                success: 0,
                flag: "find data fail"
            });
        } else {
            if (result.length != 0) {
                console.log('find success!');
                callback({
                    success: 1,
                    flag: "find data success",
                    result: result
                });
            } else {
                console.log('find fail:no this data!');
                callback({
                    success: 0,
                    flag: 'find fail:no this data!'
                });
            }
        }
    }).sort(sort);
};

/**
 * 公共populate find方法
 * 是关联查找
 * @param model
 * @param conditions
 * @param path :The field need to be refilled （需要覆盖的字段）
 * @param fields :select fields (name -_id,Separated by a space field,In front of the field name plus "-"said not filled in)
 * @param refmodel （关联的字段，有path可为null）
 * @param options
 * @param callback
 */
const findDataPopulation = (model, conditions, path, fields, refmodel, options, callback) => {

    model.find(conditions).populate(path, fields, refmodel, options).exec(function (err, result) {
        if (err) {
            console.log(err);
            callback({
                success: 0,
                flag: 'population find data fail'
            });
        } else {
            if (result.length != 0) {
                console.log('population find success!');
                callback({
                    success: 1,
                    flag: 'population find data success',
                    result: result
                });
            } else {
                console.log('population find fail:no this data!');
                callback({
                    success: 0,
                    flag: 'population find fail:no this data!'
                });
            }
        }
    });
}
/**
 * 自增id
 * @param {*} sequenceName
 * @returns
 */
const getNextSequenceValue = (sequenceName)=>{
    let sequenceDocument = db.counters.findAndModify(
        {
           query:{_id: sequenceName },
           update: {$inc:{sequence_value:1}},
           "new":true
        });
     return sequenceDocument.sequence_value;
}

module.exports = {
    addData,
    addManyData,
    updateData,
    removeData,
    findData,
    findDataPopulation,
    getNextSequenceValue
};
