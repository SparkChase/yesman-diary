import { Category } from "@/lib/constants";

export interface Challenge {
  id: number;
  content: string;
  category: Category;
}

const challenges: Challenge[] = [
  { "id": 1, "content": "和便利店的店员多聊一句", "category": "social" },
  { "id": 2, "content": "走一条从未走过的路回家", "category": "explore" },
  { "id": 3, "content": "尝试一种从未吃过的水果", "category": "food" },
  { "id": 4, "content": "画一幅涂鸦，不管好坏", "category": "creative" },
  { "id": 5, "content": "做 10 个俯卧撑", "category": "health" },
  { "id": 6, "content": "花 30 分钟学一个新概念", "category": "learning" },
  { "id": 7, "content": "给许久未联系的朋友发条消息", "category": "social" },
  { "id": 8, "content": "去一家从未去过的餐厅", "category": "food" },
  { "id": 9, "content": "坐公交车到终点站看看", "category": "explore" },
  { "id": 10, "content": "写一首短诗或几句歌词", "category": "creative" },
  { "id": 11, "content": "冥想 10 分钟", "category": "health" },
  { "id": 12, "content": "看完一篇长文章", "category": "learning" },
  { "id": 13, "content": "向陌生人微笑", "category": "social" },
  { "id": 14, "content": "自己做一道新菜", "category": "food" },
  { "id": 15, "content": "探索家附近的小巷", "category": "explore" },
  { "id": 16, "content": "拍一组有主题的照片", "category": "creative" },
  { "id": 17, "content": "早睡一小时", "category": "health" },
  { "id": 18, "content": "了解一个历史事件", "category": "learning" },
  { "id": 19, "content": "主动发起一次聚会", "category": "social" },
  { "id": 20, "content": "品尝一种异国料理", "category": "food" },
  { "id": 21, "content": "独自去一个新地方", "category": "explore" },
  { "id": 22, "content": "学一段简单的舞蹈", "category": "creative" },
  { "id": 23, "content": "喝一杯比平时多的水", "category": "health" },
  { "id": 24, "content": "学会一个新单词的用法", "category": "learning" },
  { "id": 25, "content": "赞美一个你欣赏的人", "category": "social" },
  { "id": 26, "content": "做一道甜点", "category": "food" },
  { "id": 27, "content": "早起看日出", "category": "explore" },
  { "id": 28, "content": "录一段自己的声音", "category": "creative" },
  { "id": 29, "content": "拉伸 15 分钟", "category": "health" },
  { "id": 30, "content": "看完一个 TED 演讲", "category": "learning" },
  { "id": 31, "content": "加入一个感兴趣的社群", "category": "social" },
  { "id": 32, "content": "不吃外卖，自己做饭一整天", "category": "food" },
  { "id": 33, "content": "去图书馆逛逛", "category": "explore" },
  { "id": 34, "content": "写一封给未来的信", "category": "creative" },
  { "id": 35, "content": "戒掉含糖饮料一天", "category": "health" },
  { "id": 36, "content": "学会一个新的快捷键", "category": "learning" },
  { "id": 37, "content": "和邻居打个招呼", "category": "social" },
  { "id": 38, "content": "去菜市场买菜", "category": "food" },
  { "id": 39, "content": "骑单车去一个没去过的地方", "category": "explore" },
  { "id": 40, "content": "重新装饰你的桌面", "category": "creative" },
  { "id": 41, "content": "走够 8000 步", "category": "health" },
  { "id": 42, "content": "读完一章书", "category": "learning" },
  { "id": 43, "content": "帮陌生人一个小忙", "category": "social" },
  { "id": 44, "content": "尝试素食一天", "category": "food" },
  { "id": 45, "content": "去公园野餐", "category": "explore" },
  { "id": 46, "content": "拼一个拼图或乐高", "category": "creative" },
  { "id": 47, "content": "做 5 分钟深呼吸", "category": "health" },
  { "id": 48, "content": "了解一个新的科学发现", "category": "learning" },
  { "id": 49, "content": "组织一次线上分享", "category": "social" },
  { "id": 50, "content": "尝试一种新饮品", "category": "food" }
];

export default challenges;
