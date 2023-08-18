import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useChatStore } from './chat'
import { useAlgorithmStore } from '../stores/algorithm'

export const useKnightStore = defineStore('knight', () => {
    const storeChat = useChatStore()
    const storeAlgorithm = useAlgorithmStore()

    const status = reactive({
        chatMsg: '',
        timerId: 0,
        isDeathKnight: false,
        isShowGameChat: false,
        isStopFunction: false
    })

    const inner = {
        closeGameChatInSecond: (second) => {
            setTimeout(() => {
                //reset
                status.isShowGameChat = false
                status.isStopFunction = false
                storeAlgorithm.dice.bonus = 0
            }, second * 1000)
        }
    }
    const outer = {
        getGameChatEvent: (chatEvent) => {
            const getArrayFull = (array, string) => {
                let result = []
                for (let i = 0; i < array.length; i++) {
                    result.push(string)
                }
                return result
            }

            switch (chatEvent) {
                case 'weaponSuccess':
                    status.chatMsg = '果然是天選之人... 佩服佩服'
                    break

                case 'weaponFailure':
                    status.chatMsg = '10%機率可不是叫假的誒'
                    break

                case 'weaponNope':
                    status.chatMsg = 'NOT TODAY!'
                    break

                case 'armor1':
                    status.chatMsg = '好像沒過幾樣吶....再加油啊'
                    break

                case 'armor2':
                    status.chatMsg = '老大 別心急啊~~慢慢來嘛'
                    break

                case 'talk0':
                    storeAlgorithm.dice.bonus = 50
                    status.chatMsg = '似乎有風圍圍繞在你的滑鼠'
                    break

                case 'talk1':
                    storeAlgorithm.dice.bonus = 25
                    status.chatMsg = '似乎有微風圍圍繞在你的滑鼠'
                    break

                case 'talk2':
                    storeAlgorithm.dice.bonus = -100
                    status.chatMsg = '似乎有詛咒圍圍繞在你的滑鼠'
                    break

                case 'talk3':
                    status.isStopFunction = true
                    status.chatMsg = '似乎有阻力圍圍繞在你的滑鼠'
                    break

                case 'talk4':
                    status.chatMsg = '用白的衝10只有33%成功率'
                    break

                case 'talk5':
                    status.chatMsg = '用祝福的衝10只有66%成功率'
                    break
                case 'talk6':
                    status.chatMsg = '用紅的衝10只有50%成功率'
                    break

                case 'talk7':
                    status.chatMsg = '試著點戒指變身看看吧！'
                    break

                case 'talk8':
                    status.chatMsg = '講個笑話給你聽 有一天............哈哈'
                    break

                case 'talk9':
                    storeChat.status.lines = getArrayFull(
                        Array(7),
                        '國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國'
                    )
                    status.chatMsg =
                        '國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國'
                    break

                case 'toBeKnight':
                    status.isDeathKnight = false
                    status.chatMsg = '騎士好棒棒'
                    break

                case 'toBeDeathKnight':
                    status.isDeathKnight = true
                    status.chatMsg = '..'
                    break
            }
            status.isShowGameChat = true
            inner.closeGameChatInSecond(10)
        },
        repeatTalkChatEvent: (second) => {
            const timerId = setInterval(() => {
                let randomNum = Math.floor(Math.random() * 10)
                outer.getGameChatEvent(`talk${randomNum}`)
            }, second * 1000)
            status.timerId = timerId
        },
        clearRepeatTalkChatEventTimer: () => {
            window.clearInterval(status.timerId)
        }
    }

    return {
        status,
        outer
    }
})
