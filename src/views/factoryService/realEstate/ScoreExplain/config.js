export const scoreColumns = [
  { label: '类型', key: 'type', width: '150px' },
  { label: '等级', key: 'grade', width: '150px' },
  { label: '分数区间', key: 'score', width: '150px' },
  { label: '等级解释', key: 'explain' },
]

export const scoreDataSource = [
  {
    type: '非上市',
    grade: 'A',
    score: '[84.2-100)',
    explain: '抗风险能力极强，风险总体较低，高于行业平均水平',
  },
  {
    type: '非上市',
    grade: 'B',
    score: '[74.2-84.2)',
    explain: '抗风险能力很强，风险总体较低，高于行业平均水平',
  },
  {
    type: '非上市',
    grade: 'C',
    score: '[59.2-74.2)',
    explain: '抗风险能力较强，风险总体我低，略高于行业平均水平',
  },
  {
    type: '非上市',
    grade: 'D',
    score: '[39.2-59.2)',
    explain: '抗风险能力一般，风险总体一般，行业平均水平',
  },
  {
    type: '非上市',
    grade: 'E',
    score: '[29.2-39.2)',
    explain: '抗风险能力较弱，风险总体咯高，低于行业平均水平',
  },
  {
    type: '非上市',
    grade: 'F',
    score: '[19.2-29.2)',
    explain: '抗风险能力很弱，风险总体略高，低于行业平均水平',
  },
  {
    type: '非上市',
    grade: 'G',
    score: '[0-19.2)',
    explain: '抗风险能力极弱，风险总体高，远低于行业平均水平',
  },
  {
    type: '上市',
    grade: 'A',
    score: '[81.2-100)',
    explain: '抗风险能力极强，风险总体较低，高于行业平均水平',
  },
  {
    type: '上市',
    grade: 'B',
    score: '[71.2-81.2)',
    explain: '抗风险能力极强，风险总体较低，高于行业平均水平',
  },
  {
    type: '上市',
    grade: 'C',
    score: '[61.2-71.2)',
    explain: '抗风险能力较强，风险总体较低，略高于行业平均水平',
  },
  {
    type: '上市',
    grade: 'D',
    score: '[51.2-61.2)',
    explain: '抗风险能力一般，风险总体一般，行业平均水平',
  },
  {
    type: '上市',
    grade: 'E',
    score: '[41.2-51.2)',
    explain: '抗风险能力较弱，风险总体略高，低于行业平均水平',
  },
  {
    type: '上市',
    grade: 'F',
    score: '[31.2-41.2)',
    explain: '抗风险能力很弱，风险总体略高，低于行业平均水平',
  },
  {
    type: '上市',
    grade: 'G',
    score: '[0-31.2)',
    explain: '抗风险能力极弱，风险总体高，远低于行业平均水平',
  },
]

export const interColumns = [
  { label: '级别', key: 'grade', width: '150px' },
  { label: '标普', key: 'bp', width: '150px' },
  { label: '穆迪', key: 'md', width: '150px' },
  { label: '惠普', key: 'hp', width: '150px' },
  { label: '风险程度', key: 'risk' },
]

export const interDataSource = [
  {
    grade: '投资级',
    bp: 'AAA',
    md: 'Aaa',
    hp: 'AAA',
    risk: '还本付息能力极强，有可靠保证，承担风险最小'
  },
  {
    grade: '投资级',
    bp: 'AA+ AA AA-',
    md: 'Aa1 Aa2 Aa3',
    hp: 'AA+ AA AA-',
    risk: '还本付息能力很强，但风险性比前者略高'
  },
  {
    grade: '投资级',
    bp: 'A+ A A-',
    md: 'A1 A2 A3',
    hp: 'A+ A A-',
    risk: '安全性良好，还本付息能力一般，有潜在的导致风险恶化的可能性'
  },
  {
    grade: '投资级',
    bp: 'BBB+ BBB BBB-',
    md: 'Baa1 Baa2 Baa3',
    hp: 'BBB+ BBB BBB-',
    risk: '安全性中等，短期内还本付息没问题，但在经济不景气时风险增大'
  },
  {
    grade: '投机级',
    bp: 'BB+ BB BB-',
    md: 'Ba1 Ba2 Ba3',
    hp: 'BB+ BB BB-',
    risk: '有投机因素，不能确保投资安全，情况变化时还本付息能力波动大，不可靠'
  },
  {
    grade: '投机级',
    bp: 'B+ B B-',
    md: 'B1 B2 B3',
    hp: 'B+ B B-',
    risk: '不适合作为投资对象，在还本付息和遵守契约条件方面均不可靠'
  },
  {
    grade: '投机级',
    bp: 'CCC',
    md: 'Caa',
    hp: 'CCC',
    risk: '安全性极低，随时有无法还本付息的危险'
  },
  {
    grade: '投机级',
    bp: 'CC',
    md: 'Ca',
    hp: 'CC',
    risk: '极具投机性，目前正处于违约状态中，或有严重缺陷'
  },
  {
    grade: '投机级',
    bp: 'C',
    md: 'C',
    hp: 'C',
    risk: '最低等级，完全投机性'
  },
  {
    grade: '违约级',
    bp: 'SD',
    md: 'D',
    hp: 'RD',
    risk: '债务违约'
  },
  {
    grade: '违约级',
    bp: 'D',
    md: '-',
    hp: 'D',
    risk: '债务违约'
  },
]

export const nationalColumns = [
  { label: '中诚信国际', key: 'zcxgj', width: '100px' },
  { label: '联合资信', key: 'lhzx', width: '100px' },
  { label: '新世纪评级', key: 'xsjpj', width: '100px' },
  { label: '大公国际', key: 'dggj', width: '100px' },
  { label: '中债资信', key: 'zzzx', width: '100px' },
  { label: '风险程度', key: 'risk' },
]

export const nationalDataSource = [
  {
    zcxgj: 'AAA',
    lhzx: 'AAA',
    xsjpj: 'AAA',
    dggj: 'AAA',
    zzzx: 'AAA',
    risk: '偿还债务的能力极强，基本不受不利经济环境的影响，违约风险极低。',
  },
  {
    zcxgj: 'AA',
    lhzx: 'AA',
    xsjpj: 'AA',
    dggj: 'AA',
    zzzx: 'AA',
    risk: '偿还债务的能力很强，受不利经济环境的影响较小，违约风险很低。',
  },
  {
    zcxgj: 'A',
    lhzx: 'A',
    xsjpj: 'A',
    dggj: 'A',
    zzzx: 'A',
    risk: '偿还债务的能力较强，较易受不利经济环境的影响，违约风险较低。',
  },
  {
    zcxgj: 'BBB',
    lhzx: 'BBB',
    xsjpj: 'BBB',
    dggj: 'BBB',
    zzzx: 'BBB',
    risk: '偿还债务的能力一般，受不利经济环境影响较大，违约风险一般。',
  },
  {
    zcxgj: 'BB',
    lhzx: 'BB',
    xsjpj: 'BB',
    dggj: 'BB',
    zzzx: 'BB',
    risk: '偿还债务的能力较弱，受不利经济环境影响很大，有较高违约风险。',
  },
  {
    zcxgj: 'B',
    lhzx: 'B',
    xsjpj: 'B',
    dggj: 'B',
    zzzx: 'B',
    risk: '偿还债务的能力较大地依赖于良好的经济环境，违约风险很高。',
  },
  {
    zcxgj: 'CCC',
    lhzx: 'CCC',
    xsjpj: 'CCC',
    dggj: 'CCC',
    zzzx: 'CCC',
    risk: '偿还债务的能力极度依赖于良好的经济环境，违约风险极高。',
  },
  {
    zcxgj: 'CC',
    lhzx: 'CC',
    xsjpj: 'CC',
    dggj: 'CC',
    zzzx: 'CC',
    risk: '在破产或重组时可获得保护较小，基本不能保证偿还债务。',
  },
  {
    zcxgj: 'C',
    lhzx: 'C',
    xsjpj: 'C',
    dggj: 'C',
    zzzx: 'C',
    risk: '不能偿还债务。',
  },
]
