{"filter":false,"title":"index.js","tooltip":"/utilities/mail_service/index.js","undoManager":{"mark":38,"position":38,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":39},"action":"insert","lines":["var nodemailer = require(\"nodemailer\");"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":39},"end":{"row":1,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":0},"end":{"row":1,"column":56},"action":"insert","lines":["var configMailObject = require(\"./mail_configurations\");"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":4},"end":{"row":1,"column":20},"action":"remove","lines":["configMailObject"]},{"start":{"row":1,"column":4},"end":{"row":1,"column":29},"action":"insert","lines":["emailServiceConfiguration"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":43},"end":{"row":1,"column":62},"action":"remove","lines":["mail_configurations"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":43},"end":{"row":1,"column":48},"action":"insert","lines":["confi"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":48},"end":{"row":1,"column":55},"action":"insert","lines":["guratio"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":55},"end":{"row":1,"column":56},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":56},"end":{"row":1,"column":58},"action":"insert","lines":[".j"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":58},"end":{"row":1,"column":59},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":56},"end":{"row":1,"column":59},"action":"remove","lines":[".js"]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":59},"end":{"row":3,"column":0},"action":"insert","lines":["","",""]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":0},"end":{"row":9,"column":8},"action":"insert","lines":["var transporter = nodemailer.createTransport({","        service: configMailObject.service,","        auth: {","            user: configMailObject.sender,","            pass: configMailObject.senderPass","        }","    }); "]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":5},"end":{"row":10,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":17},"end":{"row":4,"column":33},"action":"remove","lines":["configMailObject"]},{"start":{"row":4,"column":17},"end":{"row":4,"column":42},"action":"insert","lines":["emailServiceConfiguration"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":18},"end":{"row":6,"column":34},"action":"remove","lines":["configMailObject"]},{"start":{"row":6,"column":18},"end":{"row":6,"column":43},"action":"insert","lines":["emailServiceConfiguration"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":18},"end":{"row":7,"column":34},"action":"remove","lines":["configMailObject"]},{"start":{"row":7,"column":18},"end":{"row":7,"column":43},"action":"insert","lines":["emailServiceConfiguration"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":4},"end":{"row":3,"column":15},"action":"remove","lines":["transporter"]},{"start":{"row":3,"column":4},"end":{"row":3,"column":8},"action":"insert","lines":["emai"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":8},"end":{"row":3,"column":9},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":9},"end":{"row":3,"column":10},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":10},"end":{"row":3,"column":14},"action":"insert","lines":["ervi"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":14},"end":{"row":3,"column":16},"action":"insert","lines":["ce"]}]}],[{"group":"doc","deltas":[{"start":{"row":10,"column":3},"end":{"row":11,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":10,"column":3},"end":{"row":11,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":10,"column":2},"end":{"row":10,"column":3},"action":"remove","lines":[" "]},{"start":{"row":10,"column":2},"end":{"row":11,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":0},"end":{"row":12,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["modu"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":4},"end":{"row":12,"column":6},"action":"insert","lines":["le"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":6},"end":{"row":12,"column":9},"action":"insert","lines":[".ex"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":9},"end":{"row":12,"column":13},"action":"insert","lines":["port"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":13},"end":{"row":12,"column":14},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":14},"end":{"row":12,"column":15},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":15},"end":{"row":12,"column":17},"action":"insert","lines":["= "]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":17},"end":{"row":12,"column":18},"action":"insert","lines":["E"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":17},"end":{"row":12,"column":18},"action":"remove","lines":["E"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":17},"end":{"row":12,"column":18},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":18},"end":{"row":12,"column":21},"action":"insert","lines":["mai"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":17},"end":{"row":12,"column":21},"action":"remove","lines":["emai"]},{"start":{"row":12,"column":17},"end":{"row":12,"column":29},"action":"insert","lines":["emailService"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":29},"end":{"row":12,"column":30},"action":"insert","lines":[";"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":10,"column":2},"end":{"row":10,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1427490856809,"hash":"19c5950031cf2ad58bbda8d5d5e705f9941a9aa3"}