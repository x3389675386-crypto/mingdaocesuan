/**
 * 明道测算 - 核心数据
 * 包含天干地支、64卦、塔罗牌等所有基础数据
 */

// ============ 天干 ============
const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const GAN_WUXING = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];
const GAN_YINYANG = ['阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴'];
const GAN_NAYIN_WUXING = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];

// ============ 地支 ============
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZHI_WUXING = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
const ZHI_SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const ZHI_YINYANG = ['阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴'];
const ZHI_YUEFEN = ['十一月', '十二月', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月'];
const ZHI_HOUR = ['23-01', '01-03', '03-05', '05-07', '07-09', '09-11', '11-13', '13-15', '15-17', '17-19', '19-21', '21-23'];

// ============ 五行 ============
const WUXING = ['金', '木', '水', '火', '土'];
const WUXING_COLORS = {
  '金': '#f4d03f',
  '木': '#27ae60',
  '水': '#3498db',
  '火': '#e74c3c',
  '土': '#d4a574'
};
const WUXING_BG = {
  '金': 'rgba(244,208,63,0.15)',
  '木': 'rgba(39,174,96,0.15)',
  '水': 'rgba(52,152,219,0.15)',
  '火': 'rgba(231,76,60,0.15)',
  '土': 'rgba(212,165,116,0.15)'
};

// 五行生克
const WUXING_SHENG = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
const WUXING_KE = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

// ============ 六十甲子 ============
const JIAZI = [];
for (let i = 0; i < 60; i++) {
  JIAZI.push(GAN[i % 10] + ZHI[i % 12]);
}

// 纳音五行对照表
const NAYIN = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火',
  '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土',
  '霹雳火', '松柏木', '流年水', '沙中金', '山下火', '平地木',
  '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金',
  '桑柘木', '柘榴木', '大海水', '石榴木', '大海水', '海中金'
];

// ============ 八卦 ============
const BAGUA = {
  '乾': { symbol: '☰', nature: '天', wuxing: '金', direction: '西北', num: 1, binary: '111' },
  '兑': { symbol: '☱', nature: '泽', wuxing: '金', direction: '西', num: 2, binary: '110' },
  '离': { symbol: '☲', nature: '火', wuxing: '火', direction: '南', num: 3, binary: '101' },
  '震': { symbol: '☳', nature: '雷', wuxing: '木', direction: '东', num: 4, binary: '100' },
  '巽': { symbol: '☴', nature: '风', wuxing: '木', direction: '东南', num: 5, binary: '011' },
  '坎': { symbol: '☵', nature: '水', wuxing: '水', direction: '北', num: 6, binary: '010' },
  '艮': { symbol: '☶', nature: '山', wuxing: '土', direction: '东北', num: 7, binary: '001' },
  '坤': { symbol: '☷', nature: '地', wuxing: '土', direction: '西南', num: 8, binary: '000' }
};

const TRIGRAM_NAMES = ['坤', '艮', '坎', '巽', '震', '离', '兑', '乾'];

// ============ 64卦 ============
// binary: 6位从下到上 (0=阴, 1=阳), 索引: lower_trigram_index * 8 + upper_trigram_index
const HEXAGRAMS_DATA = [
  // 1-8
  { num: 1, binary: '111111', name: '乾为天', trigrams: '上乾下乾', judgment: '元亨利贞', meaning: '大吉大利，万事亨通。创始、发展、成熟、收获四个阶段都顺利。宜积极进取，自强不息。' },
  { num: 2, binary: '000000', name: '坤为地', trigrams: '上坤下坤', judgment: '元亨，利牝马之贞', meaning: '柔顺包容，厚德载物。宜以柔克刚，顺势而为。适合等待时机，不宜冒进。' },
  { num: 3, binary: '100010', name: '水雷屯', trigrams: '上坎下震', judgment: '元亨利贞，勿用有攸往', meaning: '万事开头难。创业初期艰难，需养精蓄锐，等待时机。宜建侯而不宜轻举妄动。' },
  { num: 4, binary: '010001', name: '山水蒙', trigrams: '上艮下坎', judgment: '亨，匪我求童蒙', meaning: '蒙昧待启，需要学习与启蒙。求学的好时机，但需要诚心和毅力。' },
  { num: 5, binary: '111010', name: '水天需', trigrams: '上坎下乾', judgment: '有孚，光亨，贞吉', meaning: '等待时机。需耐心等待，时机一到自然水到渠成。饮食宴乐，养精蓄锐。' },
  { num: 6, binary: '010111', name: '天水讼', trigrams: '上乾下坎', judgment: '有孚窒惕，中吉终凶', meaning: '争讼之象。宜和解不宜对抗。见大人有利，冒险涉大川则凶。' },
  { num: 7, binary: '010000', name: '地水师', trigrams: '上坤下坎', judgment: '贞丈人吉，无咎', meaning: '出师用兵之象。需有名正言顺的理由和德高望重的统帅。适合团队行动。' },
  { num: 8, binary: '000010', name: '水地比', trigrams: '上坎下坤', judgment: '吉，原筮元永贞', meaning: '亲比和睦。众人归附，团结协作。宜亲近贤德之人。' },
  // 9-16
  { num: 9, binary: '111011', name: '风天小畜', trigrams: '上巽下乾', judgment: '亨，密云不雨', meaning: '小有积蓄。虽有所成但力量尚不足，需要继续积累。密云不雨，还需等待。' },
  { num: 10, binary: '110111', name: '天泽履', trigrams: '上乾下兑', judgment: '履虎尾，不咥人，亨', meaning: '如履薄冰。小心行事，即使身处险境也能安然无恙。践履正道则吉。' },
  { num: 11, binary: '111000', name: '地天泰', trigrams: '上坤下乾', judgment: '小往大来，吉亨', meaning: '天地交泰，万事通顺。阴阳和合，上下沟通。事业亨通，利于发展。' },
  { num: 12, binary: '000111', name: '天地否', trigrams: '上乾下坤', judgment: '否之匪人，不利君子贞', meaning: '闭塞不通。天地不交，万事不顺。退守自保，韬光养晦。' },
  { num: 13, binary: '101111', name: '天火同人', trigrams: '上乾下离', judgment: '同人于野，亨', meaning: '志同道合。众人同心，其利断金。宜团结合作，共谋大事。' },
  { num: 14, binary: '111101', name: '火天大有', trigrams: '上离下乾', judgment: '元亨', meaning: '大有收获。丰盛富足，事业兴旺。顺天应人，吉祥如意。' },
  { num: 15, binary: '001000', name: '地山谦', trigrams: '上坤下艮', judgment: '亨，君子有终', meaning: '谦虚谨慎。满招损，谦受益。保持谦虚态度，终得善果。' },
  { num: 16, binary: '000100', name: '雷地豫', trigrams: '上震下坤', judgment: '利建侯行师', meaning: '愉悦安乐。顺时而动，事半功倍。适合建立基业，出师行动。' },
  // 17-24
  { num: 17, binary: '100110', name: '泽雷随', trigrams: '上兑下震', judgment: '元亨利贞，无咎', meaning: '随时而动。顺应时势，灵活变通。随机应变，天下随时。' },
  { num: 18, binary: '011001', name: '山风蛊', trigrams: '上艮下巽', judgment: '元亨，利涉大川', meaning: '拨乱反正。发现问题需要及时治理。先甲三日后甲三日，需要规划。' },
  { num: 19, binary: '110000', name: '地泽临', trigrams: '上坤下兑', judgment: '元亨利贞，至于八月有凶', meaning: '居高临下。视察民情，教导万民。宜接近民众，体察实际。' },
  { num: 20, binary: '000011', name: '风地观', trigrams: '上巽下坤', judgment: '盥而不荐，有孚颙若', meaning: '观察思考。审时度势，观望待机。宜深入观察，方能明辨是非。' },
  { num: 21, binary: '100101', name: '火雷噬嗑', trigrams: '上离下震', judgment: '亨，利用狱', meaning: '咬合咀嚼。克服障碍，解决问题。宜果断行动，当断则断。' },
  { num: 22, binary: '101001', name: '山火贲', trigrams: '上艮下离', judgment: '亨，小利有攸往', meaning: '文饰美化。注重形式与包装。适合装饰、宣传，但不宜过分。' },
  { num: 23, binary: '000001', name: '山地剥', trigrams: '上艮下坤', judgment: '不利有攸往', meaning: '剥落衰退。小人当道，君子退避。顺而止之，等待时机。' },
  { num: 24, binary: '100000', name: '地雷复', trigrams: '上坤下震', judgment: '亨，出入无疾', meaning: '一阳来复。冬去春来，事物开始复苏。七日来复，循环往复。' },
  // 25-32
  { num: 25, binary: '100111', name: '天雷无妄', trigrams: '上乾下震', judgment: '元亨利贞，其匪正有眚', meaning: '真实无妄。真诚待人，实事求是。不可弄虚作假，否则必有灾祸。' },
  { num: 26, binary: '111001', name: '山天大畜', trigrams: '上艮下乾', judgment: '利贞，不家食吉', meaning: '大畜积养。养精蓄锐，厚积薄发。宜储备力量，学习提升。' },
  { num: 27, binary: '100001', name: '山雷颐', trigrams: '上艮下震', judgment: '贞吉，观颐自求口实', meaning: '颐养之道。修身养性，注意饮食起居。言语谨慎，饮食有节。' },
  { num: 28, binary: '011110', name: '泽风大过', trigrams: '上兑下巽', judgment: '栋桡，利有攸往，亨', meaning: '大为过甚。事物发展超出常规。栋梁弯曲，需要调整平衡。' },
  { num: 29, binary: '010010', name: '坎为水', trigrams: '上坎下坎', judgment: '有孚维心，亨，行有尚', meaning: '重重险阻。身处困境，但仍需坚持。心怀诚信则可渡过难关。' },
  { num: 30, binary: '101101', name: '离为火', trigrams: '上离下离', judgment: '利贞亨，畜牝牛吉', meaning: '依附光明。日月丽天，光明正大。柔顺中正则吉。' },
  { num: 31, binary: '001110', name: '泽山咸', trigrams: '上兑下艮', judgment: '亨利贞，取女吉', meaning: '感应相通。男女感应，情感交流。以虚受人，心心相映。利婚恋。' },
  { num: 32, binary: '011100', name: '雷风恒', trigrams: '上震下巽', judgment: '亨，无咎，利贞，利有攸往', meaning: '恒久之道。持久稳定，持之以恒。夫妻之道在于长久。' },
  // 33-40
  { num: 33, binary: '001111', name: '天山遁', trigrams: '上乾下艮', judgment: '亨，小利贞', meaning: '退避隐遁。君子退避小人，以退为进。知时务者为俊杰。' },
  { num: 34, binary: '111100', name: '雷天大壮', trigrams: '上震下乾', judgment: '利贞', meaning: '强盛壮大。阳刚之气正盛。宜守正，不可恃强凌弱。' },
  { num: 35, binary: '000101', name: '火地晋', trigrams: '上离下坤', judgment: '康侯用锡马蕃庶', meaning: '进步上升。如日出东方，蒸蒸日上。宜积极进取。' },
  { num: 36, binary: '101000', name: '地火明夷', trigrams: '上坤下离', judgment: '利艰贞', meaning: '光明被伤。黑暗时期，君子蒙难。需在艰难中坚守正道。' },
  { num: 37, binary: '101011', name: '风火家人', trigrams: '上巽下离', judgment: '利女贞', meaning: '家庭和睦。各司其职，家庭兴旺。治家之道在于言有物而行有恒。' },
  { num: 38, binary: '110101', name: '火泽睽', trigrams: '上离下兑', judgment: '小事吉', meaning: '乖离睽异。意见分歧，各有主张。小事可成，大事需同中求异。' },
  { num: 39, binary: '001010', name: '水山蹇', trigrams: '上坎下艮', judgment: '利西南，不利东北', meaning: '艰难险阻。前有险山后有恶水。宜另寻出路，见大人求助。' },
  { num: 40, binary: '010100', name: '雷水解', trigrams: '上震下坎', judgment: '利西南，无所往', meaning: '解除困难。否极泰来，困难即将解除。宜宽恕包容，赦过宥罪。' },
  // 41-48
  { num: 41, binary: '110001', name: '山泽损', trigrams: '上艮下兑', judgment: '有孚元吉，无咎可贞', meaning: '减损之道。损下益上，损己利人。有时减损反而是为了更好的发展。' },
  { num: 42, binary: '100011', name: '风雷益', trigrams: '上巽下震', judgment: '利有攸往，利涉大川', meaning: '增益受益。天施地生，其益无方。宜顺应时机，积极进取。' },
  { num: 43, binary: '111110', name: '泽天夬', trigrams: '上兑下乾', judgment: '扬于王庭，孚号有厉', meaning: '决断裁决。当断不断，反受其乱。宜公开公正地处理问题。' },
  { num: 44, binary: '011111', name: '天风姤', trigrams: '上乾下巽', judgment: '女壮，勿用取女', meaning: '不期而遇。偶然相遇，一见钟情。但需谨慎，不宜轻信。' },
  { num: 45, binary: '000110', name: '泽地萃', trigrams: '上兑下坤', judgment: '亨，王假有庙', meaning: '汇聚聚集。精英荟萃，人才济济。宜聚会交流，共商大计。' },
  { num: 46, binary: '011000', name: '地风升', trigrams: '上坤下巽', judgment: '元亨，用见大人', meaning: '上升渐进。由小到大，逐步提升。积小成大，步步高升。' },
  { num: 47, binary: '010110', name: '泽水困', trigrams: '上兑下坎', judgment: '亨贞，大人吉，无咎', meaning: '困顿艰难。身处困境，但仍要坚守。有言不信，言语无力。' },
  { num: 48, binary: '011010', name: '水风井', trigrams: '上坎下巽', judgment: '改邑不改井，无丧无得', meaning: '井养不穷。如井水养人，取之不竭。养人惠物，恒久不变。' },
  // 49-56
  { num: 49, binary: '101110', name: '泽火革', trigrams: '上兑下离', judgment: '己日乃孚，元亨利贞', meaning: '变革更新。除旧布新，顺应天时。变革需要时机和诚信。' },
  { num: 50, binary: '011101', name: '火风鼎', trigrams: '上离下巽', judgment: '元吉亨', meaning: '鼎新革故。如鼎烹食，化生为熟。取新用贤，事业鼎盛。' },
  { num: 51, binary: '100100', name: '震为雷', trigrams: '上震下震', judgment: '亨，震来虩虩', meaning: '震动惊雷。如雷霆万钧，令人敬畏。临危不惧则吉。' },
  { num: 52, binary: '001001', name: '艮为山', trigrams: '上艮下艮', judgment: '艮其背，不获其身', meaning: '静止如山。当止则止，行止适时。知止不殆，可以长久。' },
  { num: 53, binary: '001011', name: '风山渐', trigrams: '上巽下艮', judgment: '女归吉，利贞', meaning: '渐进徐行。如女子出嫁，水到渠成。循序渐进，不可急于求成。' },
  { num: 54, binary: '110100', name: '雷泽归妹', trigrams: '上震下兑', judgment: '征凶，无攸利', meaning: '少女归嫁。婚嫁之象，但需注意感情中的不匹配。宜审慎对待。' },
  { num: 55, binary: '101100', name: '雷火丰', trigrams: '上震下离', judgment: '亨，王假之，勿忧', meaning: '丰盛盈满。日正当中，充裕富足。宜分享，不宜独占。' },
  { num: 56, binary: '001101', name: '火山旅', trigrams: '上离下艮', judgment: '小亨，旅贞吉', meaning: '旅居在外。行旅之道，宜处处小心。客居异乡，需谦虚待人。' },
  // 57-64
  { num: 57, binary: '011011', name: '巽为风', trigrams: '上巽下巽', judgment: '小亨，利有攸往', meaning: '顺从渗透。如风入万物，无孔不入。宜以柔克刚，循序渐进。' },
  { num: 58, binary: '110110', name: '兑为泽', trigrams: '上兑下兑', judgment: '亨利贞', meaning: '喜悦和乐。如泽水滋润，万物欢悦。宜以和为贵，广交朋友。' },
  { num: 59, binary: '010011', name: '风水涣', trigrams: '上巽下坎', judgment: '亨，王假有庙', meaning: '涣散离散。人心涣散，需要重新凝聚。宜团结一致，同心协力。' },
  { num: 60, binary: '110010', name: '水泽节', trigrams: '上坎下兑', judgment: '亨，苦节不可贞', meaning: '节制适度。凡事有度，过犹不及。宜制定规范，遵守制度。' },
  { num: 61, binary: '110011', name: '风泽中孚', trigrams: '上巽下兑', judgment: '豚鱼吉，利涉大川', meaning: '诚信之道。以诚待人，乃至豚鱼亦能感通。诚信是立身之本。' },
  { num: 62, binary: '001100', name: '雷山小过', trigrams: '上震下艮', judgment: '亨利贞，可小事不可大事', meaning: '略微过度。小事情可以稍微偏差，大事必须把握好分寸。' },
  { num: 63, binary: '101010', name: '水火既济', trigrams: '上坎下离', judgment: '亨小，利贞，初吉终乱', meaning: '事已完成。大功告成，但成功之后更要谨慎。守成不易。' },
  { num: 64, binary: '010101', name: '火水未济', trigrams: '上离下坎', judgment: '亨，小狐汔济', meaning: '尚未完成。如小狐渡河，将济未济。革命尚未成功，仍需努力。' }
];

// 构建64卦查询map
const HEXAGRAM_MAP = {};
HEXAGRAMS_DATA.forEach(h => {
  HEXAGRAM_MAP[h.binary] = h;
});

// ============ 塔罗牌数据 (22张大阿卡纳) ============
const TAROT_MAJOR_ARCANA = [
  {
    num: 0, name: '愚者', enName: 'The Fool',
    element: '风', planet: '天王星',
    keywords: '开始、冒险、天真、自由',
    upright: '新的开始，冒险精神，天真无邪，无限可能。代表一段新旅程的起点，需要勇气踏出第一步。',
    reversed: '鲁莽冲动，考虑不周，逃避现实。可能做出了草率的决定，需要重新审视。'
  },
  {
    num: 1, name: '魔术师', enName: 'The Magician',
    element: '风', planet: '水星',
    keywords: '创造力、技能、自信、沟通',
    upright: '创造力充沛，能力超群，一切就绪准备开始。拥有实现目标所需的所有资源和才能。',
    reversed: '才能被浪费，缺乏自信，沟通不畅。要小心欺骗和操纵。'
  },
  {
    num: 2, name: '女祭司', enName: 'The High Priestess',
    element: '水', planet: '月亮',
    keywords: '直觉、潜意识、神秘、智慧',
    upright: '倾听内心的声音，直觉准确。隐藏的知识正在浮现，需要静心冥想。',
    reversed: '忽略直觉，情绪混乱，秘密被隐藏。需要回归内心，重新连接内在智慧。'
  },
  {
    num: 3, name: '女皇', enName: 'The Empress',
    element: '土', planet: '金星',
    keywords: '丰饶、母性、繁荣、感官',
    upright: '丰收与繁荣，创造力达到顶峰。母性的温暖与关怀，物质和精神的双重富足。',
    reversed: '依赖过度，创造力受阻，物质匮乏。可能需要更多的自我照顾。'
  },
  {
    num: 4, name: '皇帝', enName: 'The Emperor',
    element: '火', planet: '白羊座',
    keywords: '权威、秩序、稳定、领导力',
    upright: '权威与秩序，稳定的领导力。需要建立规则和框架，掌控全局。',
    reversed: '滥用权力，专制独裁，缺乏纪律。需要重新审视自己的领导方式。'
  },
  {
    num: 5, name: '教皇', enName: 'The Hierophant',
    element: '土', planet: '金牛座',
    keywords: '传统、信仰、教育、指引',
    upright: '遵循传统，寻求精神指引。适合学习深造，拜师学艺。',
    reversed: '打破传统，质疑权威，思想僵化。需要寻找属于自己的道路。'
  },
  {
    num: 6, name: '恋人', enName: 'The Lovers',
    element: '风', planet: '双子座',
    keywords: '爱情、选择、和谐、关系',
    upright: '真挚的爱情，重要的选择。需要在不同的方向中做出抉择，听从内心的声音。利姻缘桃花。',
    reversed: '感情破裂，错误的选择，价值观冲突。需要反思自己的选择是否正确。'
  },
  {
    num: 7, name: '战车', enName: 'The Chariot',
    element: '水', planet: '巨蟹座',
    keywords: '胜利、意志力、征服、前进',
    upright: '凭借坚强的意志力克服困难。胜利在望，需要坚持不懈。',
    reversed: '失控的状态，失败，缺乏方向。需要重新掌握主动权。'
  },
  {
    num: 8, name: '力量', enName: 'Strength',
    element: '火', planet: '狮子座',
    keywords: '内在力量、勇气、耐心、驯服',
    upright: '内心的力量胜过外在的蛮力。以柔克刚，用爱和耐心解决一切。',
    reversed: '软弱无力，缺乏自信，被情绪控制。需要找回内在的力量。'
  },
  {
    num: 9, name: '隐士', enName: 'The Hermit',
    element: '土', planet: '处女座',
    keywords: '内省、孤独、智慧、指引',
    upright: '需要独处静思，寻求内心智慧。远离喧嚣，专注自我成长。',
    reversed: '过度孤立，逃避现实，固步自封。需要走出舒适区。'
  },
  {
    num: 10, name: '命运之轮', enName: 'Wheel of Fortune',
    element: '火', planet: '木星',
    keywords: '命运、转变、机遇、循环',
    upright: '命运之轮正在转向上方，好运即将来临。时来运转，把握机遇。',
    reversed: '厄运降临，事情失去控制，陷入低谷。但轮子终将再次转动。'
  },
  {
    num: 11, name: '正义', enName: 'Justice',
    element: '风', planet: '天秤座',
    keywords: '公平、因果、平衡、真相',
    upright: '公正的裁决，真相大白。善有善报，恶有恶报。做出的决定将影响深远。',
    reversed: '不公正，偏见，逃避责任。需要面对自己行为带来的后果。'
  },
  {
    num: 12, name: '倒吊人', enName: 'The Hanged Man',
    element: '水', planet: '海王星',
    keywords: '牺牲、换个角度、等待、顿悟',
    upright: '需要换一个角度看问题。主动的牺牲和等待，最终会带来顿悟。',
    reversed: '白费力气，固执己见，无法放手。需要放下执念。'
  },
  {
    num: 13, name: '死神', enName: 'Death',
    element: '水', planet: '天蝎座',
    keywords: '结束、转变、重生、放下',
    upright: '旧事物的结束，新事物的开始。凤凰涅槃，浴火重生。放下过去才能迎接新生。',
    reversed: '抗拒改变，停滞不前，害怕失去。越是抗拒改变，痛苦越久。'
  },
  {
    num: 14, name: '节制', enName: 'Temperance',
    element: '火', planet: '射手座',
    keywords: '调和、平衡、适度、融合',
    upright: '掌握平衡之道，调和矛盾。以适度和耐心对待一切事物。',
    reversed: '失衡，过度，缺乏节制。需要找回内心的平衡。'
  },
  {
    num: 15, name: '恶魔', enName: 'The Devil',
    element: '土', planet: '摩羯座',
    keywords: '束缚、欲望、物质主义、阴影',
    upright: '被欲望和物质所束缚。沉溺于不健康的关系或习惯中。需要意识到束缚的存在。',
    reversed: '挣脱束缚，觉醒，克服欲望。开始摆脱不良习惯和关系。'
  },
  {
    num: 16, name: '高塔', enName: 'The Tower',
    element: '火', planet: '火星',
    keywords: '突变、崩溃、启示、打破',
    upright: '突如其来的巨变，旧结构的崩塌。虽然痛苦但必要的改变。旧的去了才能建新的。',
    reversed: '抗拒改变，延长痛苦，危机减缓但未解除。'
  },
  {
    num: 17, name: '星星', enName: 'The Star',
    element: '风', planet: '水瓶座',
    keywords: '希望、灵感、愈合、宁静',
    upright: '希望之光，治愈与安宁。暴风雨后的平静，一切都会好起来。让桃花盛开。',
    reversed: '失去希望，灵感枯竭，消极悲观。需要重新找回内心的光芒。'
  },
  {
    num: 18, name: '月亮', enName: 'The Moon',
    element: '水', planet: '双鱼座',
    keywords: '幻觉、恐惧、潜意识、迷惑',
    upright: '迷雾重重，看不清真相。恐惧和幻觉在干扰判断。需要信任直觉，穿越迷雾。',
    reversed: '恐惧消退，迷雾散去，真相逐渐显现。但仍需保持警惕。'
  },
  {
    num: 19, name: '太阳', enName: 'The Sun',
    element: '火', planet: '太阳',
    keywords: '成功、快乐、生命力、光明',
    upright: '阳光普照，万物生长。成功与快乐，一切都充满光明和温暖。最好的牌之一。',
    reversed: '暂时的不如意，但阳光终究会到来。小小的挫折不影响大局。'
  },
  {
    num: 20, name: '审判', enName: 'Judgement',
    element: '火', planet: '冥王星',
    keywords: '觉醒、重生、召唤、评估',
    upright: '觉醒的时刻，接受召唤。是时候审视过去、重新开始了。内心升华。',
    reversed: '逃避召唤，拒绝反省，无法释怀。需要面对自己的过去。'
  },
  {
    num: 21, name: '世界', enName: 'The World',
    element: '土', planet: '土星',
    keywords: '完成、圆满、成功、整合',
    upright: '一个周期的圆满结束，目标达成。完美的结局，事业家庭双丰收。',
    reversed: '接近完成但尚有不足，不圆满的结局。需要再努力一把。'
  }
];

// ============ 寻物方位参考 ============
const LOST_DIRECTIONS = [
  { direction: '正北', element: '水', advice: '检查水源附近，如厨房、卫生间、鱼缸旁', likelihood: '较高' },
  { direction: '东北', element: '土', advice: '检查高处、书架、储物柜的上层', likelihood: '中等' },
  { direction: '正东', element: '木', advice: '检查绿色物品旁、植物附近、木质家具旁', likelihood: '较高' },
  { direction: '东南', element: '木', advice: '检查抽屉、衣柜、角落藏物之处', likelihood: '中等' },
  { direction: '正南', element: '火', advice: '检查电器旁、发热物品附近、红色物品旁', likelihood: '较低' },
  { direction: '西南', element: '土', advice: '检查地面、地板缝隙、低处和角落', likelihood: '中等' },
  { direction: '正西', element: '金', advice: '检查金属物品旁、白色物品附近、门口鞋柜', likelihood: '较高' },
  { direction: '西北', element: '金', advice: '检查长辈房间、衣柜上层、贵重物品存放处', likelihood: '中等' }
];

// ============ 桃花星 ============
const TAOHUA_STAR = {
  '寅午戌': '卯',
  '申子辰': '酉',
  '巳酉丑': '午',
  '亥卯未': '子'
};

// ============ 地支藏干 ============
const ZHI_CANGGAN = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};
