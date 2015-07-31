{"filter":false,"title":"middleware.js","tooltip":"/Communication/middleware.js","undoManager":{"mark":79,"position":79,"stack":[[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":1}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"insert","lines":["",""],"id":3}],[{"start":{"row":3,"column":0},"end":{"row":32,"column":2},"action":"insert","lines":["var processNotifications = function(req, res, next) {","    ","    var notificationTypes = {","        ","        NO_EMAIL_REGISTERED : { ","            type : 'redirect',","            view : 'Password_recover/password_recovery'","        },","        SUCCESS_PASSWORD_RECOVERY_REQUEST : {","            type : 'redirect',","            view : 'Password_recover/password_recovery'","        },","        NO_MANUAL_RECOVERY_EMAIL : {","            type : 'redirect',","            view : 'Password_recover/password_recovery'           ","        }","    };","    ","    if(req.session.notification) {","","        var locals = {message : req.clearNotification()};","        ","        if(notificationTypes[locals.message.id].type === 'redirect') {","            ","            res.render(notificationTypes[locals.message.id].view, locals);","        }","    }","    else","        next();","};"],"id":4}],[{"start":{"row":32,"column":2},"end":{"row":33,"column":0},"action":"insert","lines":["",""],"id":5}],[{"start":{"row":33,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["",""],"id":6}],[{"start":{"row":34,"column":0},"end":{"row":35,"column":0},"action":"insert","lines":["",""],"id":7}],[{"start":{"row":35,"column":0},"end":{"row":35,"column":1},"action":"insert","lines":["m"],"id":8}],[{"start":{"row":35,"column":1},"end":{"row":35,"column":2},"action":"insert","lines":["o"],"id":9}],[{"start":{"row":35,"column":2},"end":{"row":35,"column":3},"action":"insert","lines":["d"],"id":10}],[{"start":{"row":35,"column":3},"end":{"row":35,"column":4},"action":"insert","lines":["u"],"id":11}],[{"start":{"row":35,"column":4},"end":{"row":35,"column":5},"action":"insert","lines":["l"],"id":12}],[{"start":{"row":35,"column":5},"end":{"row":35,"column":6},"action":"insert","lines":["e"],"id":13}],[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"insert","lines":["."],"id":14}],[{"start":{"row":35,"column":7},"end":{"row":35,"column":14},"action":"insert","lines":["exports"],"id":15}],[{"start":{"row":35,"column":14},"end":{"row":35,"column":15},"action":"insert","lines":[" "],"id":16}],[{"start":{"row":35,"column":15},"end":{"row":35,"column":16},"action":"insert","lines":["="],"id":17}],[{"start":{"row":35,"column":16},"end":{"row":35,"column":17},"action":"insert","lines":[" "],"id":18}],[{"start":{"row":35,"column":17},"end":{"row":35,"column":18},"action":"insert","lines":["p"],"id":19}],[{"start":{"row":35,"column":18},"end":{"row":35,"column":19},"action":"insert","lines":["r"],"id":20}],[{"start":{"row":35,"column":19},"end":{"row":35,"column":20},"action":"insert","lines":["o"],"id":21}],[{"start":{"row":35,"column":17},"end":{"row":35,"column":20},"action":"remove","lines":["pro"],"id":22},{"start":{"row":35,"column":17},"end":{"row":35,"column":39},"action":"insert","lines":["processNotifications()"]}],[{"start":{"row":35,"column":38},"end":{"row":35,"column":39},"action":"remove","lines":[")"],"id":23}],[{"start":{"row":35,"column":37},"end":{"row":35,"column":38},"action":"remove","lines":["("],"id":24}],[{"start":{"row":35,"column":37},"end":{"row":35,"column":38},"action":"insert","lines":[";"],"id":25}],[{"start":{"row":35,"column":38},"end":{"row":35,"column":39},"action":"insert","lines":[" "],"id":26}],[{"start":{"row":5,"column":0},"end":{"row":19,"column":6},"action":"remove","lines":["    var notificationTypes = {","        ","        NO_EMAIL_REGISTERED : { ","            type : 'redirect',","            view : 'Password_recover/password_recovery'","        },","        SUCCESS_PASSWORD_RECOVERY_REQUEST : {","            type : 'redirect',","            view : 'Password_recover/password_recovery'","        },","        NO_MANUAL_RECOVERY_EMAIL : {","            type : 'redirect',","            view : 'Password_recover/password_recovery'           ","        }","    };"],"id":27}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":28}],[{"start":{"row":2,"column":0},"end":{"row":2,"column":1},"action":"insert","lines":["v"],"id":29}],[{"start":{"row":2,"column":1},"end":{"row":2,"column":2},"action":"insert","lines":["a"],"id":30}],[{"start":{"row":2,"column":2},"end":{"row":2,"column":3},"action":"insert","lines":["r"],"id":31}],[{"start":{"row":2,"column":3},"end":{"row":2,"column":4},"action":"insert","lines":[" "],"id":32}],[{"start":{"row":2,"column":4},"end":{"row":2,"column":5},"action":"insert","lines":["n"],"id":33}],[{"start":{"row":2,"column":5},"end":{"row":2,"column":6},"action":"insert","lines":["o"],"id":34}],[{"start":{"row":2,"column":4},"end":{"row":2,"column":6},"action":"remove","lines":["no"],"id":35},{"start":{"row":2,"column":4},"end":{"row":2,"column":21},"action":"insert","lines":["notificationTypes"]}],[{"start":{"row":2,"column":21},"end":{"row":2,"column":22},"action":"insert","lines":[" "],"id":36}],[{"start":{"row":2,"column":22},"end":{"row":2,"column":23},"action":"insert","lines":["="],"id":37}],[{"start":{"row":2,"column":23},"end":{"row":2,"column":24},"action":"insert","lines":[" "],"id":38}],[{"start":{"row":2,"column":24},"end":{"row":2,"column":25},"action":"insert","lines":["r"],"id":39}],[{"start":{"row":2,"column":25},"end":{"row":2,"column":26},"action":"insert","lines":["e"],"id":40}],[{"start":{"row":2,"column":24},"end":{"row":2,"column":26},"action":"remove","lines":["re"],"id":41},{"start":{"row":2,"column":24},"end":{"row":2,"column":32},"action":"insert","lines":["redirect"]}],[{"start":{"row":2,"column":31},"end":{"row":2,"column":32},"action":"remove","lines":["t"],"id":42}],[{"start":{"row":2,"column":30},"end":{"row":2,"column":31},"action":"remove","lines":["c"],"id":43}],[{"start":{"row":2,"column":29},"end":{"row":2,"column":30},"action":"remove","lines":["e"],"id":44}],[{"start":{"row":2,"column":28},"end":{"row":2,"column":29},"action":"remove","lines":["r"],"id":45}],[{"start":{"row":2,"column":27},"end":{"row":2,"column":28},"action":"remove","lines":["i"],"id":46}],[{"start":{"row":2,"column":26},"end":{"row":2,"column":27},"action":"remove","lines":["d"],"id":47}],[{"start":{"row":2,"column":26},"end":{"row":2,"column":27},"action":"insert","lines":["q"],"id":48}],[{"start":{"row":2,"column":27},"end":{"row":2,"column":28},"action":"insert","lines":["u"],"id":49}],[{"start":{"row":2,"column":28},"end":{"row":2,"column":29},"action":"insert","lines":["i"],"id":50}],[{"start":{"row":2,"column":29},"end":{"row":2,"column":30},"action":"insert","lines":["t"],"id":51}],[{"start":{"row":2,"column":29},"end":{"row":2,"column":30},"action":"remove","lines":["t"],"id":52}],[{"start":{"row":2,"column":29},"end":{"row":2,"column":30},"action":"insert","lines":["r"],"id":53}],[{"start":{"row":2,"column":30},"end":{"row":2,"column":31},"action":"insert","lines":["e"],"id":54}],[{"start":{"row":2,"column":31},"end":{"row":2,"column":33},"action":"insert","lines":["()"],"id":55}],[{"start":{"row":2,"column":32},"end":{"row":2,"column":34},"action":"insert","lines":["\"\""],"id":56}],[{"start":{"row":2,"column":33},"end":{"row":2,"column":34},"action":"insert","lines":["n"],"id":57}],[{"start":{"row":2,"column":34},"end":{"row":2,"column":35},"action":"insert","lines":["o"],"id":58}],[{"start":{"row":2,"column":35},"end":{"row":2,"column":36},"action":"insert","lines":["t"],"id":59}],[{"start":{"row":2,"column":36},"end":{"row":2,"column":37},"action":"insert","lines":["i"],"id":60}],[{"start":{"row":2,"column":37},"end":{"row":2,"column":38},"action":"insert","lines":["f"],"id":61}],[{"start":{"row":2,"column":38},"end":{"row":2,"column":39},"action":"insert","lines":["i"],"id":62}],[{"start":{"row":2,"column":39},"end":{"row":2,"column":40},"action":"insert","lines":["c"],"id":63}],[{"start":{"row":2,"column":40},"end":{"row":2,"column":41},"action":"insert","lines":["a"],"id":64}],[{"start":{"row":2,"column":41},"end":{"row":2,"column":42},"action":"insert","lines":["c"],"id":65}],[{"start":{"row":2,"column":42},"end":{"row":2,"column":43},"action":"insert","lines":["t"],"id":66}],[{"start":{"row":2,"column":43},"end":{"row":2,"column":44},"action":"insert","lines":["i"],"id":67}],[{"start":{"row":2,"column":44},"end":{"row":2,"column":45},"action":"insert","lines":["o"],"id":68}],[{"start":{"row":2,"column":45},"end":{"row":2,"column":46},"action":"insert","lines":["n"],"id":69}],[{"start":{"row":2,"column":46},"end":{"row":2,"column":47},"action":"insert","lines":["_"],"id":70}],[{"start":{"row":2,"column":47},"end":{"row":2,"column":48},"action":"insert","lines":["t"],"id":71}],[{"start":{"row":2,"column":48},"end":{"row":2,"column":49},"action":"insert","lines":["y"],"id":72}],[{"start":{"row":2,"column":49},"end":{"row":2,"column":50},"action":"insert","lines":["o"],"id":73}],[{"start":{"row":2,"column":50},"end":{"row":2,"column":51},"action":"insert","lines":["e"],"id":74}],[{"start":{"row":2,"column":50},"end":{"row":2,"column":51},"action":"remove","lines":["e"],"id":75}],[{"start":{"row":2,"column":49},"end":{"row":2,"column":50},"action":"remove","lines":["o"],"id":76}],[{"start":{"row":2,"column":49},"end":{"row":2,"column":50},"action":"insert","lines":["p"],"id":77}],[{"start":{"row":2,"column":50},"end":{"row":2,"column":51},"action":"insert","lines":["e"],"id":78}],[{"start":{"row":2,"column":51},"end":{"row":2,"column":52},"action":"insert","lines":["s"],"id":79}],[{"start":{"row":2,"column":54},"end":{"row":2,"column":55},"action":"insert","lines":[";"],"id":80}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":4,"column":4},"end":{"row":4,"column":25},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1438015991662,"hash":"3b581f0b0824ddeac3d15e55c3bfda1de6a2f68b"}