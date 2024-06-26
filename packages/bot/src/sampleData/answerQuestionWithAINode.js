import parseEventSourceFromPlainText from './parseEventSourceFromPlainText.js';

export default () =>
  parseEventSourceFromPlainText(`event: activity
data: {"id":"typing-1","type":"typing"}

event: activity
data: {"id":"a-00000","type":"typing","text":"Processing","channelData":{"streamType":"informative","streamSequence":1}}

event: activity
data: {"id":"a-00001","type":"typing","text":"","channelData":{"streamType":"streaming","streamSequence":1}}

event: activity
data: {"id":"a-00001-1","type":"typing","text":"Of","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":2}}

event: activity
data: {"id":"a-00001-2","type":"typing","text":" course","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":3}}

event: activity
data: {"id":"a-00001-3","type":"typing","text":"!","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":4}}

event: activity
data: {"id":"a-00001-4","type":"typing","text":" Here","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":5}}

event: activity
data: {"id":"a-00001-5","type":"typing","text":" are","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":6}}

event: activity
data: {"id":"a-00001-6","type":"typing","text":" some","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":7}}

event: activity
data: {"id":"a-00001-7","type":"typing","text":" words","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":8}}

event: activity
data: {"id":"a-00001-8","type":"typing","text":" from","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":9}}

event: activity
data: {"id":"a-00001-9","type":"typing","text":" A","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":10}}

event: activity
data: {"id":"a-00001-10","type":"typing","text":" to","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":11}}

event: activity
data: {"id":"a-00001-11","type":"typing","text":" Z","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":12}}

event: activity
data: {"id":"a-00001-12","type":"typing","text":":\\n\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":13}}

event: activity
data: {"id":"a-00001-13","type":"typing","text":"A","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":14}}

event: activity
data: {"id":"a-00001-14","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":15}}

event: activity
data: {"id":"a-00001-15","type":"typing","text":" Apple","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":16}}

event: activity
data: {"id":"a-00001-16","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":17}}

event: activity
data: {"id":"a-00001-17","type":"typing","text":"B","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":18}}

event: activity
data: {"id":"a-00001-18","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":19}}

event: activity
data: {"id":"a-00001-19","type":"typing","text":" Banana","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":20}}

event: activity
data: {"id":"a-00001-20","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":21}}

event: activity
data: {"id":"a-00001-21","type":"typing","text":"C","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":22}}

event: activity
data: {"id":"a-00001-22","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":23}}

event: activity
data: {"id":"a-00001-23","type":"typing","text":" Cat","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":24}}

event: activity
data: {"id":"a-00001-24","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":25}}

event: activity
data: {"id":"a-00001-25","type":"typing","text":"D","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":26}}

event: activity
data: {"id":"a-00001-26","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":27}}

event: activity
data: {"id":"a-00001-27","type":"typing","text":" Dog","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":28}}

event: activity
data: {"id":"a-00001-28","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":29}}

event: activity
data: {"id":"a-00001-29","type":"typing","text":"E","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":30}}

event: activity
data: {"id":"a-00001-30","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":31}}

event: activity
data: {"id":"a-00001-31","type":"typing","text":" Elephant","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":32}}

event: activity
data: {"id":"a-00001-32","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":33}}

event: activity
data: {"id":"a-00001-33","type":"typing","text":"F","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":34}}

event: activity
data: {"id":"a-00001-34","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":35}}

event: activity
data: {"id":"a-00001-35","type":"typing","text":" Fish","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":36}}

event: activity
data: {"id":"a-00001-36","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":37}}

event: activity
data: {"id":"a-00001-37","type":"typing","text":"G","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":38}}

event: activity
data: {"id":"a-00001-38","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":39}}

event: activity
data: {"id":"a-00001-39","type":"typing","text":" Gir","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":40}}

event: activity
data: {"id":"a-00001-40","type":"typing","text":"affe","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":41}}

event: activity
data: {"id":"a-00001-41","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":42}}

event: activity
data: {"id":"a-00001-42","type":"typing","text":"H","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":43}}

event: activity
data: {"id":"a-00001-43","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":44}}

event: activity
data: {"id":"a-00001-44","type":"typing","text":" Hat","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":45}}

event: activity
data: {"id":"a-00001-45","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":46}}

event: activity
data: {"id":"a-00001-46","type":"typing","text":"I","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":47}}

event: activity
data: {"id":"a-00001-47","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":48}}

event: activity
data: {"id":"a-00001-48","type":"typing","text":" Ice","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":49}}

event: activity
data: {"id":"a-00001-49","type":"typing","text":" cream","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":50}}

event: activity
data: {"id":"a-00001-50","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":51}}

event: activity
data: {"id":"a-00001-51","type":"typing","text":"J","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":52}}

event: activity
data: {"id":"a-00001-52","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":53}}

event: activity
data: {"id":"a-00001-53","type":"typing","text":" Jelly","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":54}}

event: activity
data: {"id":"a-00001-54","type":"typing","text":"fish","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":55}}

event: activity
data: {"id":"a-00001-55","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":56}}

event: activity
data: {"id":"a-00001-56","type":"typing","text":"K","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":57}}

event: activity
data: {"id":"a-00001-57","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":58}}

event: activity
data: {"id":"a-00001-58","type":"typing","text":" Kang","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":59}}

event: activity
data: {"id":"a-00001-59","type":"typing","text":"aroo","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":60}}

event: activity
data: {"id":"a-00001-60","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":61}}

event: activity
data: {"id":"a-00001-61","type":"typing","text":"L","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":62}}

event: activity
data: {"id":"a-00001-62","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":63}}

event: activity
data: {"id":"a-00001-63","type":"typing","text":" Lion","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":64}}

event: activity
data: {"id":"a-00001-64","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":65}}

event: activity
data: {"id":"a-00001-65","type":"typing","text":"M","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":66}}

event: activity
data: {"id":"a-00001-66","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":67}}

event: activity
data: {"id":"a-00001-67","type":"typing","text":" Monkey","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":68}}

event: activity
data: {"id":"a-00001-68","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":69}}

event: activity
data: {"id":"a-00001-69","type":"typing","text":"N","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":70}}

event: activity
data: {"id":"a-00001-70","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":71}}

event: activity
data: {"id":"a-00001-71","type":"typing","text":" Nest","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":72}}

event: activity
data: {"id":"a-00001-72","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":73}}

event: activity
data: {"id":"a-00001-73","type":"typing","text":"O","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":74}}

event: activity
data: {"id":"a-00001-74","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":75}}

event: activity
data: {"id":"a-00001-75","type":"typing","text":" Oct","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":76}}

event: activity
data: {"id":"a-00001-76","type":"typing","text":"opus","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":77}}

event: activity
data: {"id":"a-00001-77","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":78}}

event: activity
data: {"id":"a-00001-78","type":"typing","text":"P","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":79}}

event: activity
data: {"id":"a-00001-79","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":80}}

event: activity
data: {"id":"a-00001-80","type":"typing","text":" Penguin","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":81}}

event: activity
data: {"id":"a-00001-81","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":82}}

event: activity
data: {"id":"a-00001-82","type":"typing","text":"Q","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":83}}

event: activity
data: {"id":"a-00001-83","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":84}}

event: activity
data: {"id":"a-00001-84","type":"typing","text":" Queen","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":85}}

event: activity
data: {"id":"a-00001-85","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":86}}

event: activity
data: {"id":"a-00001-86","type":"typing","text":"R","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":87}}

event: activity
data: {"id":"a-00001-87","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":88}}

event: activity
data: {"id":"a-00001-88","type":"typing","text":" Rabbit","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":89}}

event: activity
data: {"id":"a-00001-89","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":90}}

event: activity
data: {"id":"a-00001-90","type":"typing","text":"S","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":91}}

event: activity
data: {"id":"a-00001-91","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":92}}

event: activity
data: {"id":"a-00001-92","type":"typing","text":" Sun","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":93}}

event: activity
data: {"id":"a-00001-93","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":94}}

event: activity
data: {"id":"a-00001-94","type":"typing","text":"T","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":95}}

event: activity
data: {"id":"a-00001-95","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":96}}

event: activity
data: {"id":"a-00001-96","type":"typing","text":" Turtle","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":97}}

event: activity
data: {"id":"a-00001-97","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":98}}

event: activity
data: {"id":"a-00001-98","type":"typing","text":"U","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":99}}

event: activity
data: {"id":"a-00001-99","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":100}}

event: activity
data: {"id":"a-00001-100","type":"typing","text":" Umb","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":101}}

event: activity
data: {"id":"a-00001-101","type":"typing","text":"rella","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":102}}

event: activity
data: {"id":"a-00001-102","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":103}}

event: activity
data: {"id":"a-00001-103","type":"typing","text":"V","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":104}}

event: activity
data: {"id":"a-00001-104","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":105}}

event: activity
data: {"id":"a-00001-105","type":"typing","text":" Viol","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":106}}

event: activity
data: {"id":"a-00001-106","type":"typing","text":"in","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":107}}

event: activity
data: {"id":"a-00001-107","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":108}}

event: activity
data: {"id":"a-00001-108","type":"typing","text":"W","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":109}}

event: activity
data: {"id":"a-00001-109","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":110}}

event: activity
data: {"id":"a-00001-110","type":"typing","text":" Whale","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":111}}

event: activity
data: {"id":"a-00001-111","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":112}}

event: activity
data: {"id":"a-00001-112","type":"typing","text":"X","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":113}}

event: activity
data: {"id":"a-00001-113","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":114}}

event: activity
data: {"id":"a-00001-114","type":"typing","text":" X","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":115}}

event: activity
data: {"id":"a-00001-115","type":"typing","text":"y","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":116}}

event: activity
data: {"id":"a-00001-116","type":"typing","text":"lo","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":117}}

event: activity
data: {"id":"a-00001-117","type":"typing","text":"phone","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":118}}

event: activity
data: {"id":"a-00001-118","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":119}}

event: activity
data: {"id":"a-00001-119","type":"typing","text":"Y","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":120}}

event: activity
data: {"id":"a-00001-120","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":121}}

event: activity
data: {"id":"a-00001-121","type":"typing","text":" Yak","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":122}}

event: activity
data: {"id":"a-00001-122","type":"typing","text":"\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":123}}

event: activity
data: {"id":"a-00001-123","type":"typing","text":"Z","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":124}}

event: activity
data: {"id":"a-00001-124","type":"typing","text":" -","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":125}}

event: activity
data: {"id":"a-00001-125","type":"typing","text":" Z","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":126}}

event: activity
data: {"id":"a-00001-126","type":"typing","text":"ebra","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":127}}

event: activity
data: {"id":"a-00001-127","type":"typing","text":"\\n\\n","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":128}}

event: activity
data: {"id":"a-00001-128","type":"typing","text":"I","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":129}}

event: activity
data: {"id":"a-00001-129","type":"typing","text":" hope","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":130}}

event: activity
data: {"id":"a-00001-130","type":"typing","text":" you","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":131}}

event: activity
data: {"id":"a-00001-131","type":"typing","text":" find","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":132}}

event: activity
data: {"id":"a-00001-132","type":"typing","text":" this","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":133}}

event: activity
data: {"id":"a-00001-133","type":"typing","text":" list","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":134}}

event: activity
data: {"id":"a-00001-134","type":"typing","text":" helpful","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":135}}

event: activity
data: {"id":"a-00001-135","type":"typing","text":"!","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":136}}

event: activity
data: {"id":"a-00001-136","type":"typing","text":" Let","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":137}}

event: activity
data: {"id":"a-00001-137","type":"typing","text":" me","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":138}}

event: activity
data: {"id":"a-00001-138","type":"typing","text":" know","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":139}}

event: activity
data: {"id":"a-00001-139","type":"typing","text":" if","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":140}}

event: activity
data: {"id":"a-00001-140","type":"typing","text":" you","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":141}}

event: activity
data: {"id":"a-00001-141","type":"typing","text":"\\u0027d","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":142}}

event: activity
data: {"id":"a-00001-142","type":"typing","text":" like","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":143}}

event: activity
data: {"id":"a-00001-143","type":"typing","text":" more","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":144}}

event: activity
data: {"id":"a-00001-144","type":"typing","text":" words","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":145}}

event: activity
data: {"id":"a-00001-145","type":"typing","text":" or","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":146}}

event: activity
data: {"id":"a-00001-146","type":"typing","text":" information","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":147}}

event: activity
data: {"id":"a-00001-147","type":"typing","text":".","channelData":{"streamType":"streaming","streamId":"a-00001","streamSequence":148}}

event: activity
data: {"type":"message","id":"2d9f25b5-87f8-4b43-a541-1d409355f072","timestamp":"2024-06-26T20:09:08.7873805\\u002B00:00","channelId":"pva-studio","from":{"id":"...","name":"...","role":"bot"},"conversation":{"id":"c-00001"},"recipient":{"id":"u-00001","aadObjectId":"u-00001","role":"user"},"textFormat":"markdown","membersAdded":[],"membersRemoved":[],"reactionsAdded":[],"reactionsRemoved":[],"locale":"en-US","text":"Of course! Here are some words from A to Z:\\n\\nA - Apple\\nB - Banana\\nC - Cat\\nD - Dog\\nE - Elephant\\nF - Fish\\nG - Giraffe\\nH - Hat\\nI - Ice cream\\nJ - Jellyfish\\nK - Kangaroo\\nL - Lion\\nM - Monkey\\nN - Nest\\nO - Octopus\\nP - Penguin\\nQ - Queen\\nR - Rabbit\\nS - Sun\\nT - Turtle\\nU - Umbrella\\nV - Violin\\nW - Whale\\nX - Xylophone\\nY - Yak\\nZ - Zebra\\n\\nI hope you find this list helpful! Let me know if you\\u0027d like more words or information.","speak":"\\u003Cspeak version=\\u00221.0\\u0022 xml:lang=\\u0022en-US\\u0022 xmlns:mstts=\\u0022http://www.w3.org/2001/mstts\\u0022 xmlns=\\u0022http://www.w3.org/2001/10/synthesis\\u0022\\u003E\\u003Cvoice name=\\u0022en-US-ChristopherNeural\\u0022 xmlns=\\u0022\\u0022\\u003E\\u003Cprosody rate=\\u00220%\\u0022 pitch=\\u00220%\\u0022\\u003EOf course! Here are some words from A to Z:\\r\\nA - Apple\\r\\nB - Banana\\r\\nC - Cat\\r\\nD - Dog\\r\\nE - Elephant\\r\\nF - Fish\\r\\nG - Giraffe\\r\\nH - Hat\\r\\nI - Ice cream\\r\\nJ - Jellyfish\\r\\nK - Kangaroo\\r\\nL - Lion\\r\\nM - Monkey\\r\\nN - Nest\\r\\nO - Octopus\\r\\nP - Penguin\\r\\nQ - Queen\\r\\nR - Rabbit\\r\\nS - Sun\\r\\nT - Turtle\\r\\nU - Umbrella\\r\\nV - Violin\\r\\nW - Whale\\r\\nX - Xylophone\\r\\nY - Yak\\r\\nZ - Zebra\\r\\nI hope you find this list helpful! Let me know if you\\u0027d like more words or information.\\u003C/prosody\\u003E\\u003C/voice\\u003E\\u003C/speak\\u003E","inputHint":"acceptingInput","attachments":[],"entities":[],"channelData":{"streamType":"final","streamId":"a-00001"},"replyToId":"6eb58c44-6ed2-4b98-a271-2821251f8e18","listenFor":[],"textHighlights":[]}

event: end
data: end

`);
