/*
 * @Author: wangss 
 * @Date: 2019-02-14 17:35:06 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-02-26 10:26:09
 */


 const fs = require('fs');
 const path = require('path');
 
const mkdirs = async (dir,callback)=>{
    const absolutePath = path.resolve(dir);
    let currentPath;
    if(path.extname(absolutePath)){
        currentPath = path.dirname(absolutePath);
    }else{
        currentPath = currentPath;
    }

    fs.mkdir(currentPath,{ recursive: true },err=>{
        if (err) {
            if (err.code === 'EEXIST') {
                //console.log('dir exists back! ---->' + currentDir);
                // callback();
            } else if (err.code === 'ENOENT') {

                //console.log('parent dir not exists');
                // mkdirs(path.dirname(currentPath), e => {
                //     if (e) {
                //         callback(e);
                //     } else {
                //         mkdirs(dir, callback);
                //     }
                // });

            } else {
                console.log(err);
                // callback(err);
            }
        } else {
            callback();
        }
    })

}

const saveToFile = async (file,content)=>{
    return new Promise((resolve,reject)=>{
        let parentPath = path.join(__dirname,file);
        console.log('s',parentPath);
        
        mkdirs(parentPath,()=>{
            fs.writeFile(file,content,'utf8',err1=>{
                if (err1) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    })
}


const mergeAllIndexFiles = (srcdir, dstfile) => {
    return new Promise((resolve, reject) => {

        fs.readdir(srcdir, (err, files) => {

            if (err) {
                reject();
                return;
            }

            var fileCount = files.length;
            console.log('all files ----> ' + fileCount);

            var write = fs.createWriteStream(dstfile, {
                'flag': 'a'
            });
            write.on('error', err1 => {
                write.end();
                reject(err1);
            })

            var currentIndex = 1;

            function append() {

                var file = `${srcdir}${currentIndex}.txt`;
                var readStream = fs.createReadStream(file, {
                    'encoding': 'utf8'
                });
                readStream.on('error', err1 => {
                    write.end();
                    reject(err1);
                })
                readStream.on('end', () => {
                    currentIndex++;
                    if (currentIndex <= fileCount) {
                        append();
                    } else {
                        write.end();
                        resolve('done!');
                    }
                })
                readStream.pipe(write, {
                    end: false
                });
            }
            append();

        })

    })
}

module.exports.savefile = saveToFile;
module.exports.mkdirs = mkdirs;
module.exports.mergeindexfiles = mergeAllIndexFiles;
