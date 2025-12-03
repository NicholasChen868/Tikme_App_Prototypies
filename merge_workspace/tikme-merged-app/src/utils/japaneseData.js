/**
 * Japanese Learning Data
 * Comprehensive N4-N3 Grammar and Vocabulary
 */

// Vocabulary Database (50+ words)
export const japaneseVocabulary = [
  // Group 1: Daily Actions (食べる type - Ru-verbs)
  { id: 1, kanji: '食べる', hiragana: 'たべる', romaji: 'taberu', vietnamese: 'ăn', type: 'Động từ nhóm 2', jlpt: 'N5', category: 'daily' },
  { id: 2, kanji: '見る', hiragana: 'みる', romaji: 'miru', vietnamese: 'xem', type: 'Động từ nhóm 2', jlpt: 'N5', category: 'daily' },
  { id: 3, kanji: '寝る', hiragana: 'ねる', romaji: 'neru', vietnamese: 'ngủ', type: 'Động từ nhóm 2', jlpt: 'N5', category: 'daily' },
  { id: 4, kanji: '起きる', hiragana: 'おきる', romaji: 'okiru', vietnamese: 'thức dậy', type: 'Động từ nhóm 2', jlpt: 'N5', category: 'daily' },
  { id: 5, kanji: '着る', hiragana: 'きる', romaji: 'kiru', vietnamese: 'mặc', type: 'Động từ nhóm 2', jlpt: 'N5', category: 'daily' },

  // Group 2: Daily Actions (書く type - U-verbs)
  { id: 6, kanji: '書く', hiragana: 'かく', romaji: 'kaku', vietnamese: 'viết', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 7, kanji: '読む', hiragana: 'よむ', romaji: 'yomu', vietnamese: 'đọc', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 8, kanji: '話す', hiragana: 'はなす', romaji: 'hanasu', vietnamese: 'nói', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 9, kanji: '聞く', hiragana: 'きく', romaji: 'kiku', vietnamese: 'nghe', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 10, kanji: '行く', hiragana: 'いく', romaji: 'iku', vietnamese: 'đi', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 11, kanji: '帰る', hiragana: 'かえる', romaji: 'kaeru', vietnamese: 'về', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 12, kanji: '買う', hiragana: 'かう', romaji: 'kau', vietnamese: 'mua', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 13, kanji: '売る', hiragana: 'うる', romaji: 'uru', vietnamese: 'bán', type: 'Động từ nhóm 1', jlpt: 'N4', category: 'daily' },
  { id: 14, kanji: '待つ', hiragana: 'まつ', romaji: 'matsu', vietnamese: 'đợi', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },
  { id: 15, kanji: '会う', hiragana: 'あう', romaji: 'au', vietnamese: 'gặp', type: 'Động từ nhóm 1', jlpt: 'N5', category: 'daily' },

  // Group 3: Irregular Verbs
  { id: 16, kanji: '来る', hiragana: 'くる', romaji: 'kuru', vietnamese: 'đến', type: 'Động từ bất quy tắc', jlpt: 'N5', category: 'daily' },
  { id: 17, kanji: 'する', hiragana: 'する', romaji: 'suru', vietnamese: 'làm', type: 'Động từ bất quy tắc', jlpt: 'N5', category: 'daily' },
  { id: 18, kanji: '勉強する', hiragana: 'べんきょうする', romaji: 'benkyou suru', vietnamese: 'học', type: 'Động từ', jlpt: 'N5', category: 'study' },
  { id: 19, kanji: '仕事する', hiragana: 'しごとする', romaji: 'shigoto suru', vietnamese: 'làm việc', type: 'Động từ', jlpt: 'N5', category: 'work' },
  { id: 20, kanji: '料理する', hiragana: 'りょうりする', romaji: 'ryouri suru', vietnamese: 'nấu ăn', type: 'Động từ', jlpt: 'N4', category: 'daily' },

  // Group 4: Adjectives
  { id: 21, kanji: '大きい', hiragana: 'おおきい', romaji: 'ookii', vietnamese: 'to, lớn', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 22, kanji: '小さい', hiragana: 'ちいさい', romaji: 'chiisai', vietnamese: 'nhỏ', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 23, kanji: '高い', hiragana: 'たかい', romaji: 'takai', vietnamese: 'cao, đắt', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 24, kanji: '安い', hiragana: 'やすい', romaji: 'yasui', vietnamese: 'rẻ', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 25, kanji: '新しい', hiragana: 'あたらしい', romaji: 'atarashii', vietnamese: 'mới', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 26, kanji: '古い', hiragana: 'ふるい', romaji: 'furui', vietnamese: 'cũ', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 27, kanji: '美しい', hiragana: 'うつくしい', romaji: 'utsukushii', vietnamese: 'đẹp', type: 'Tính từ đuôi い', jlpt: 'N4', category: 'adjective' },
  { id: 28, kanji: '楽しい', hiragana: 'たのしい', romaji: 'tanoshii', vietnamese: 'vui', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 29, kanji: '難しい', hiragana: 'むずかしい', romaji: 'muzukashii', vietnamese: 'khó', type: 'Tính từ đuôi い', jlpt: 'N5', category: 'adjective' },
  { id: 30, kanji: '易しい', hiragana: 'やさしい', romaji: 'yasashii', vietnamese: 'dễ', type: 'Tính từ đuôi い', jlpt: 'N4', category: 'adjective' },

  // Group 5: Na-Adjectives
  { id: 31, kanji: '静か', hiragana: 'しずか', romaji: 'shizuka', vietnamese: 'yên tĩnh', type: 'Tính từ đuôi な', jlpt: 'N5', category: 'adjective' },
  { id: 32, kanji: '賑やか', hiragana: 'にぎやか', romaji: 'nigiyaka', vietnamese: 'nhộn nhịp', type: 'Tính từ đuôi な', jlpt: 'N4', category: 'adjective' },
  { id: 33, kanji: '便利', hiragana: 'べんり', romaji: 'benri', vietnamese: 'tiện lợi', type: 'Tính từ đuôi な', jlpt: 'N5', category: 'adjective' },
  { id: 34, kanji: '有名', hiragana: 'ゆうめい', romaji: 'yuumei', vietnamese: 'nổi tiếng', type: 'Tính từ đuôi な', jlpt: 'N5', category: 'adjective' },
  { id: 35, kanji: '元気', hiragana: 'げんき', romaji: 'genki', vietnamese: 'khỏe mạnh', type: 'Tính từ đuôi な', jlpt: 'N5', category: 'adjective' },

  // Group 6: Nouns (Places)
  { id: 36, kanji: '学校', hiragana: 'がっこう', romaji: 'gakkou', vietnamese: 'trường học', type: 'Danh từ', jlpt: 'N5', category: 'place' },
  { id: 37, kanji: '会社', hiragana: 'かいしゃ', romaji: 'kaisha', vietnamese: 'công ty', type: 'Danh từ', jlpt: 'N5', category: 'place' },
  { id: 38, kanji: '病院', hiragana: 'びょういん', romaji: 'byouin', vietnamese: 'bệnh viện', type: 'Danh từ', jlpt: 'N5', category: 'place' },
  { id: 39, kanji: '駅', hiragana: 'えき', romaji: 'eki', vietnamese: 'ga tàu', type: 'Danh từ', jlpt: 'N5', category: 'place' },
  { id: 40, kanji: '空港', hiragana: 'くうこう', romaji: 'kuukou', vietnamese: 'sân bay', type: 'Danh từ', jlpt: 'N5', category: 'place' },

  // Group 7: Nouns (Objects)
  { id: 41, kanji: '本', hiragana: 'ほん', romaji: 'hon', vietnamese: 'sách', type: 'Danh từ', jlpt: 'N5', category: 'object' },
  { id: 42, kanji: '鉛筆', hiragana: 'えんぴつ', romaji: 'enpitsu', vietnamese: 'bút chì', type: 'Danh từ', jlpt: 'N5', category: 'object' },
  { id: 43, kanji: '机', hiragana: 'つくえ', romaji: 'tsukue', vietnamese: 'bàn', type: 'Danh từ', jlpt: 'N5', category: 'object' },
  { id: 44, kanji: '椅子', hiragana: 'いす', romaji: 'isu', vietnamese: 'ghế', type: 'Danh từ', jlpt: 'N5', category: 'object' },
  { id: 45, kanji: '鞄', hiragana: 'かばん', romaji: 'kaban', vietnamese: 'cặp', type: 'Danh từ', jlpt: 'N5', category: 'object' },

  // Group 8: Time Expressions
  { id: 46, kanji: '今日', hiragana: 'きょう', romaji: 'kyou', vietnamese: 'hôm nay', type: 'Danh từ', jlpt: 'N5', category: 'time' },
  { id: 47, kanji: '明日', hiragana: 'あした', romaji: 'ashita', vietnamese: 'ngày mai', type: 'Danh từ', jlpt: 'N5', category: 'time' },
  { id: 48, kanji: '昨日', hiragana: 'きのう', romaji: 'kinou', vietnamese: 'hôm qua', type: 'Danh từ', jlpt: 'N5', category: 'time' },
  { id: 49, kanji: '毎日', hiragana: 'まいにち', romaji: 'mainichi', vietnamese: 'mỗi ngày', type: 'Danh từ', jlpt: 'N5', category: 'time' },
  { id: 50, kanji: '週末', hiragana: 'しゅうまつ', romaji: 'shuumatsu', vietnamese: 'cuối tuần', type: 'Danh từ', jlpt: 'N5', category: 'time' },

  // Group 9: Family
  { id: 51, kanji: '父', hiragana: 'ちち', romaji: 'chichi', vietnamese: 'bố (của tôi)', type: 'Danh từ', jlpt: 'N5', category: 'family' },
  { id: 52, kanji: '母', hiragana: 'はは', romaji: 'haha', vietnamese: 'mẹ (của tôi)', type: 'Danh từ', jlpt: 'N5', category: 'family' },
  { id: 53, kanji: '兄', hiragana: 'あに', romaji: 'ani', vietnamese: 'anh trai (của tôi)', type: 'Danh từ', jlpt: 'N5', category: 'family' },
  { id: 54, kanji: '姉', hiragana: 'あね', romaji: 'ane', vietnamese: 'chị gái (của tôi)', type: 'Danh từ', jlpt: 'N5', category: 'family' },
  { id: 55, kanji: '弟', hiragana: 'おとうと', romaji: 'otouto', vietnamese: 'em trai', type: 'Danh từ', jlpt: 'N5', category: 'family' },
  { id: 56, kanji: '妹', hiragana: 'いもうと', romaji: 'imouto', vietnamese: 'em gái', type: 'Danh từ', jlpt: 'N5', category: 'family' },
]

// Grammar Patterns (10+)
export const grammarPatterns = [
  {
    id: 1,
    pattern: '～させる',
    name: 'Thể sai khiến (Causative Form)',
    level: 'N4',
    formation: [
      'Nhóm 1: く → かせる (書く → 書かせる)',
      'Nhóm 2: る → させる (食べる → 食べさせる)',
      'する → させる, 来る → 来させる'
    ],
    meaning: 'Làm cho ai đó làm gì / Bắt ai đó làm gì',
    examples: [
      {
        japanese: '母は子供に野菜を食べさせます。',
        romaji: 'Haha wa kodomo ni yasai wo tabesasemasu.',
        vietnamese: 'Mẹ bắt con ăn rau.',
        audio: 'causative_1.mp3'
      },
      {
        japanese: '先生は学生に本を読ませた。',
        romaji: 'Sensei wa gakusei ni hon wo yomaseta.',
        vietnamese: 'Thầy giáo cho học sinh đọc sách.',
        audio: 'causative_2.mp3'
      },
      {
        japanese: '会社は私を大阪に行かせました。',
        romaji: 'Kaisha wa watashi wo Oosaka ni ikasemashita.',
        vietnamese: 'Công ty cho tôi đi Osaka.',
        audio: 'causative_3.mp3'
      }
    ]
  },
  {
    id: 2,
    pattern: '～られる',
    name: 'Thể khả năng (Potential Form)',
    level: 'N4',
    formation: [
      'Nhóm 1: く → ける (書く → 書ける)',
      'Nhóm 2: る → られる (食べる → 食べられる)',
      'する → できる, 来る → 来られる'
    ],
    meaning: 'Có thể làm gì',
    examples: [
      {
        japanese: '日本語が話せます。',
        romaji: 'Nihongo ga hanasemasu.',
        vietnamese: 'Tôi có thể nói tiếng Nhật.',
        audio: 'potential_1.mp3'
      },
      {
        japanese: '漢字が読めますか。',
        romaji: 'Kanji ga yomemasu ka.',
        vietnamese: 'Bạn có thể đọc chữ Hán không?',
        audio: 'potential_2.mp3'
      }
    ]
  },
  {
    id: 3,
    pattern: '～てしまう',
    name: 'Hoàn tất hành động / Tiếc nuối',
    level: 'N4',
    formation: ['động từ て形 + しまう'],
    meaning: '1. Hoàn tất hành động / 2. Làm một cách tiếc nuối',
    examples: [
      {
        japanese: '宿題をやってしまいました。',
        romaji: 'Shukudai wo yatte shimaimashita.',
        vietnamese: 'Tôi đã làm xong bài tập rồi.',
        audio: 'shimau_1.mp3'
      },
      {
        japanese: '財布を忘れてしまった！',
        romaji: 'Saifu wo wasurete shimatta!',
        vietnamese: 'Tôi đã quên mất ví rồi!',
        audio: 'shimau_2.mp3'
      }
    ]
  },
  {
    id: 4,
    pattern: '～ておく',
    name: 'Chuẩn bị trước',
    level: 'N4',
    formation: ['động từ て形 + おく'],
    meaning: 'Làm gì đó trước để chuẩn bị',
    examples: [
      {
        japanese: '明日のために勉強しておきます。',
        romaji: 'Ashita no tame ni benkyou shite okimasu.',
        vietnamese: 'Tôi sẽ học trước cho ngày mai.',
        audio: 'oku_1.mp3'
      }
    ]
  },
  {
    id: 5,
    pattern: '～てくる',
    name: 'Đến và làm / Bắt đầu',
    level: 'N4',
    formation: ['động từ て形 + くる'],
    meaning: 'Đi đâu đó làm gì và quay lại',
    examples: [
      {
        japanese: 'コンビニに行ってきます。',
        romaji: 'Konbini ni itte kimasu.',
        vietnamese: 'Tôi đi cửa hàng tiện lợi một chút (và sẽ quay lại).',
        audio: 'kuru_1.mp3'
      }
    ]
  },
  {
    id: 6,
    pattern: '～ていく',
    name: 'Đi và tiếp tục',
    level: 'N4',
    formation: ['động từ て形 + いく'],
    meaning: 'Làm gì đó và tiếp tục đi / Dần dần thay đổi',
    examples: [
      {
        japanese: '持っていってください。',
        romaji: 'Motte itte kudasai.',
        vietnamese: 'Hãy mang theo đi.',
        audio: 'iku_1.mp3'
      }
    ]
  },
  {
    id: 7,
    pattern: '～ばかり',
    name: 'Chỉ, toàn',
    level: 'N4',
    formation: ['danh từ + ばかり'],
    meaning: 'Chỉ làm việc đó thôi',
    examples: [
      {
        japanese: 'ゲームばかりしています。',
        romaji: 'Geemu bakari shite imasu.',
        vietnamese: 'Chỉ toàn chơi game thôi.',
        audio: 'bakari_1.mp3'
      }
    ]
  },
  {
    id: 8,
    pattern: '～たばかり',
    name: 'Vừa mới',
    level: 'N4',
    formation: ['động từ た形 + ばかり'],
    meaning: 'Vừa mới làm gì xong',
    examples: [
      {
        japanese: '日本に来たばかりです。',
        romaji: 'Nihon ni kita bakari desu.',
        vietnamese: 'Tôi vừa mới đến Nhật.',
        audio: 'tabakari_1.mp3'
      }
    ]
  },
  {
    id: 9,
    pattern: '～ようと思う',
    name: 'Định làm, dự định',
    level: 'N4',
    formation: ['động từ ý向形 + と思う'],
    meaning: 'Dự định làm gì',
    examples: [
      {
        japanese: '明日早く起きようと思います。',
        romaji: 'Ashita hayaku okiyou to omoimasu.',
        vietnamese: 'Tôi định dậy sớm vào ngày mai.',
        audio: 'youto_1.mp3'
      }
    ]
  },
  {
    id: 10,
    pattern: '～ことがある',
    name: 'Có lần, đã từng',
    level: 'N4',
    formation: ['động từ た形 + ことがある'],
    meaning: 'Đã từng có kinh nghiệm làm gì',
    examples: [
      {
        japanese: '富士山に登ったことがあります。',
        romaji: 'Fujisan ni nobotta koto ga arimasu.',
        vietnamese: 'Tôi đã từng leo núi Phú Sĩ.',
        audio: 'koto_1.mp3'
      }
    ]
  },
  {
    id: 11,
    pattern: '～ことができる',
    name: 'Có thể làm',
    level: 'N4',
    formation: ['động từ từ điển + ことができる'],
    meaning: 'Có thể làm gì (năng lực hoặc khả năng)',
    examples: [
      {
        japanese: 'ピアノを弾くことができます。',
        romaji: 'Piano wo hiku koto ga dekimasu.',
        vietnamese: 'Tôi có thể chơi piano.',
        audio: 'dekiru_1.mp3'
      }
    ]
  }
]

// Example Sentences (30+)
export const exampleSentences = [
  // Daily life
  { id: 1, jp: '毎朝7時に起きます。', romaji: 'Maiasa shichiji ni okimasu.', vn: 'Mỗi sáng tôi dậy lúc 7 giờ.', category: 'daily', audio: 'ex_1.mp3' },
  { id: 2, jp: '朝ごはんを食べます。', romaji: 'Asagohan wo tabemasu.', vn: 'Tôi ăn sáng.', category: 'daily', audio: 'ex_2.mp3' },
  { id: 3, jp: '学校に行きます。', romaji: 'Gakkou ni ikimasu.', vn: 'Tôi đi học.', category: 'daily', audio: 'ex_3.mp3' },
  { id: 4, jp: '友達と話します。', romaji: 'Tomodachi to hanashimasu.', vn: 'Tôi nói chuyện với bạn.', category: 'daily', audio: 'ex_4.mp3' },
  { id: 5, jp: '本を読みます。', romaji: 'Hon wo yomimasu.', vn: 'Tôi đọc sách.', category: 'daily', audio: 'ex_5.mp3' },

  // Activities
  { id: 6, jp: '週末に映画を見ました。', romaji: 'Shuumatsu ni eiga wo mimashita.', vn: 'Cuối tuần tôi đã xem phim.', category: 'activity', audio: 'ex_6.mp3' },
  { id: 7, jp: '公園で遊びました。', romaji: 'Kouen de asobimashita.', vn: 'Tôi đã chơi ở công viên.', category: 'activity', audio: 'ex_7.mp3' },
  { id: 8, jp: 'レストランで食事しました。', romaji: 'Resutoran de shokuji shimashita.', vn: 'Tôi đã ăn tại nhà hàng.', category: 'activity', audio: 'ex_8.mp3' },

  // Shopping
  { id: 9, jp: 'デパートで服を買いました。', romaji: 'Depaato de fuku wo kaimashita.', vn: 'Tôi đã mua quần áo ở trung tâm thương mại.', category: 'shopping', audio: 'ex_9.mp3' },
  { id: 10, jp: 'この本は高いですね。', romaji: 'Kono hon wa takai desu ne.', vn: 'Quyển sách này đắt nhỉ.', category: 'shopping', audio: 'ex_10.mp3' },

  // Weather
  { id: 11, jp: '今日は暑いです。', romaji: 'Kyou wa atsui desu.', vn: 'Hôm nay nóng.', category: 'weather', audio: 'ex_11.mp3' },
  { id: 12, jp: '明日は雨が降ります。', romaji: 'Ashita wa ame ga furimasu.', vn: 'Ngày mai sẽ mưa.', category: 'weather', audio: 'ex_12.mp3' },

  // Feelings
  { id: 13, jp: '今日はとても楽しかったです。', romaji: 'Kyou wa totemo tanoshikatta desu.', vn: 'Hôm nay rất vui.', category: 'feeling', audio: 'ex_13.mp3' },
  { id: 14, jp: '日本語の勉強は難しいです。', romaji: 'Nihongo no benkyou wa muzukashii desu.', vn: 'Việc học tiếng Nhật khó.', category: 'feeling', audio: 'ex_14.mp3' },

  // Requests
  { id: 15, jp: 'ちょっと待ってください。', romaji: 'Chotto matte kudasai.', vn: 'Xin hãy đợi một chút.', category: 'request', audio: 'ex_15.mp3' },
  { id: 16, jp: 'もう一度言ってください。', romaji: 'Mou ichido itte kudasai.', vn: 'Xin hãy nói lại một lần nữa.', category: 'request', audio: 'ex_16.mp3' },

  // Questions
  { id: 17, jp: 'これは何ですか。', romaji: 'Kore wa nan desu ka.', vn: 'Cái này là gì?', category: 'question', audio: 'ex_17.mp3' },
  { id: 18, jp: 'どこに行きますか。', romaji: 'Doko ni ikimasu ka.', vn: 'Bạn đi đâu?', category: 'question', audio: 'ex_18.mp3' },
  { id: 19, jp: 'いつ日本に来ましたか。', romaji: 'Itsu Nihon ni kimashita ka.', vn: 'Khi nào bạn đến Nhật?', category: 'question', audio: 'ex_19.mp3' },
  { id: 20, jp: 'どうして勉強しますか。', romaji: 'Doushite benkyou shimasu ka.', vn: 'Tại sao bạn học?', category: 'question', audio: 'ex_20.mp3' },

  // Past experiences
  { id: 21, jp: '去年京都に行ったことがあります。', romaji: 'Kyonen Kyoto ni itta koto ga arimasu.', vn: 'Năm ngoái tôi đã từng đến Kyoto.', category: 'experience', audio: 'ex_21.mp3' },
  { id: 22, jp: '寿司を食べたことがありますか。', romaji: 'Sushi wo tabeta koto ga arimasu ka.', vn: 'Bạn đã từng ăn sushi chưa?', category: 'experience', audio: 'ex_22.mp3' },

  // Future plans
  { id: 23, jp: '来週旅行に行きます。', romaji: 'Raishuu ryokou ni ikimasu.', vn: 'Tuần sau tôi sẽ đi du lịch.', category: 'future', audio: 'ex_23.mp3' },
  { id: 24, jp: '明日早く起きようと思います。', romaji: 'Ashita hayaku okiyou to omoimasu.', vn: 'Tôi định dậy sớm ngày mai.', category: 'future', audio: 'ex_24.mp3' },

  // Abilities
  { id: 25, jp: '日本語が話せます。', romaji: 'Nihongo ga hanasemasu.', vn: 'Tôi có thể nói tiếng Nhật.', category: 'ability', audio: 'ex_25.mp3' },
  { id: 26, jp: '車を運転することができます。', romaji: 'Kuruma wo unten suru koto ga dekimasu.', vn: 'Tôi có thể lái xe.', category: 'ability', audio: 'ex_26.mp3' },

  // Causative examples
  { id: 27, jp: '先生は学生に宿題をさせます。', romaji: 'Sensei wa gakusei ni shukudai wo sasemasu.', vn: 'Thầy giáo bắt học sinh làm bài tập.', category: 'causative', audio: 'ex_27.mp3' },
  { id: 28, jp: '母は子供を早く寝かせました。', romaji: 'Haha wa kodomo wo hayaku nekasemashita.', vn: 'Mẹ đã cho con ngủ sớm.', category: 'causative', audio: 'ex_28.mp3' },

  // Completion
  { id: 29, jp: '宿題をやってしまいました。', romaji: 'Shukudai wo yatte shimaimashita.', vn: 'Tôi đã làm xong bài tập rồi.', category: 'completion', audio: 'ex_29.mp3' },
  { id: 30, jp: '全部食べてしまった。', romaji: 'Zenbu tabete shimatta.', vn: 'Đã ăn hết rồi.', category: 'completion', audio: 'ex_30.mp3' },

  // Preparation
  { id: 31, jp: '明日のために勉強しておきます。', romaji: 'Ashita no tame ni benkyou shite okimasu.', vn: 'Tôi sẽ học trước cho ngày mai.', category: 'preparation', audio: 'ex_31.mp3' },
  { id: 32, jp: '予約しておいてください。', romaji: 'Yoyaku shite oite kudasai.', vn: 'Xin hãy đặt trước.', category: 'preparation', audio: 'ex_32.mp3' },
]

// Practice modes
export const practiceModes = {
  flashcard: {
    name: 'Flashcard',
    icon: '📇',
    description: 'Luyện từ vựng với thẻ học'
  },
  listening: {
    name: 'Nghe',
    icon: '🎧',
    description: 'Luyện nghe phát âm'
  },
  writing: {
    name: 'Viết',
    icon: '✍️',
    description: 'Luyện viết Kanji'
  },
  speaking: {
    name: 'Nói',
    icon: '🗣️',
    description: 'Luyện phát âm'
  }
}
