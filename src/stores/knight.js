import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useChatStore } from './chat'
import { useAlgorithmStore } from '../stores/algorithm'

export const useKnightStore = defineStore('knight', () => {
    const game = reactive({
        chatMsg: '',
        timerId: 0,
        isDeathKnight: false,
        isShowGameChat: false,
        isStopFunction: false
    })
    const storeChat = useChatStore()
    const storeAlgorithm = useAlgorithmStore()

    const getGameChatEvent = (chatEvent) => {
        const getArrayFull = (array, string) => {
            let result = []
            for (let i = 0; i < array.length; i++) {
                result.push(string)
            }
            return result
        }

        switch (chatEvent) {
            case 'weaponSuccess':
                game.chatMsg = '果然是天選之人... 佩服佩服'
                break

            case 'weaponFailure':
                game.chatMsg = '10%機率可不是叫假的誒'
                break

            case 'weaponNope':
                game.chatMsg = 'NOT TODAY!'
                break

            case 'armor1':
                game.chatMsg = '好像沒過幾樣吶....再加油啊'
                break

            case 'armor2':
                game.chatMsg = '老大 別心急啊~~慢慢來嘛'
                break

            case 'talk0':
                storeAlgorithm.dice.bonus = 50
                game.chatMsg = '似乎有風圍圍繞在你的滑鼠'
                break

            case 'talk1':
                storeAlgorithm.dice.bonus = 25
                game.chatMsg = '似乎有微風圍圍繞在你的滑鼠'
                break

            case 'talk2':
                storeAlgorithm.dice.bonus = -100
                game.chatMsg = '似乎有詛咒圍圍繞在你的滑鼠'
                break

            case 'talk3':
                game.isStopFunction = true
                game.chatMsg = '似乎有阻力圍圍繞在你的滑鼠'
                break

            case 'talk4':
                game.chatMsg = '用白的衝10只有33%成功率'
                break

            case 'talk5':
                game.chatMsg = '用祝福的衝10只有66%成功率'
                break
            case 'talk6':
                game.chatMsg = '用紅的衝10只有50%成功率'
                break

            case 'talk7':
                game.chatMsg = '試著點戒指變身看看吧！'
                break

            case 'talk8':
                game.chatMsg = '講個笑話給你聽 有一天............哈哈'
                break

            case 'talk9':
                storeChat.chat.lines = getArrayFull(
                    Array(7),
                    '國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國'
                )
                game.chatMsg =
                    '國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國國'
                break

            case 'toBeKnight':
                game.isDeathKnight = false
                game.chatMsg = '騎士好棒棒'
                break

            case 'toBeDeathKnight':
                game.isDeathKnight = true
                game.chatMsg = '..'
                break
        }
        game.isShowGameChat = true
        closeGameChatInSecond(10)
    }

    const closeGameChatInSecond = (second) =>
        setTimeout(() => {
            //reset
            game.isShowGameChat = false
            game.isStopFunction = false
            storeAlgorithm.dice.bonus = 0
        }, second * 1000)

    const repeatTalkChatEvent = (second) => {
        const timerId = setInterval(() => {
            let randomNum = Math.floor(Math.random() * 10)
            getGameChatEvent(`talk${randomNum}`)
        }, second * 1000)
        game.timerId = timerId
    }
    const clearRepeatTalkChatEventTimer = () => window.clearInterval(game.timerId)
    return {
        game,
        getGameChatEvent,
        repeatTalkChatEvent,
        clearRepeatTalkChatEventTimer
    }
})
