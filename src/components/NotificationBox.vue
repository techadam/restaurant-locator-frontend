<template>
    <div v-if="notify">
        <div id="notification-box" class="notification-box">
            <div class="notification-wrapper">
                <button type="button" id="notification-close" @click="closed()" title="close">
                    <ion-icon name="close"></ion-icon>
                </button>

                <div class="notification-data">
                    <div>
                        <img src="@/assets/img/tmlogo.png" width="30px" alt="">
                    </div>
                    <div class="notification-title">
                        <h4>{{from}}</h4>
                        <p>{{subject}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/messaging'

export default {
    name: "NotificationBox",

    components: {},

    data() {
        return {
            title: "",
            from: "",
            subject: "",
            userimg: "",
            messaging: firebase.messaging(),
            currentMessage: "",
            notify: false,
        };
    },

    methods: {
        receiveMessage() {
            try {
                this.messaging.onMessage((payload) => {
                    // debugger
                    this.currentMessage = payload;
                    
                    this.setNotificationBoxForm(
                        payload.data.shipmentWallNumber,
                        payload.data.username,
                        payload.data.message
                    );
                    //console.log(message)
                    this.notify = true;
                    setTimeout(() => {
                        this.notify = false;
                    }, 3000);
                });
            } catch (e) {
                console.log(e);
            }
        },
      
        setNotificationBoxForm(title, from, subject) {
            this.title = title;
            this.from = from;
            this.subject = subject;
        },
    },

    created() {
        this.receiveMessage();
    },

    validations: function () {
        return {};
    },

    computed: {},
};
</script>

<style lang="scss" scoped>
    .notification-box {
        position: fixed;
        right: 5px;
        bottom: 10px;
        width: 400px;
        min-height: 117px;
        background-color: #fff;
        z-index: 999;
        background: #333;

        .notification-wrapper {
            position: relative;

            #notification-close {
                position: absolute;
                color: #333;
                font: 14px;
                right: 5px;
                height: 30px;
                width: 30px;
                background: transparent;
                border: none;
                outline: none;
                color: #fff;
                border-radius: 50%;
                text-decoration: none;
                text-shadow: 0 1px 0 #fff;
                top: -10px;
                z-index: 10;
                cursor: pointer;
            }

            .notification-data {
                padding: 1rem;
                display: flex;
                margin-top: 1rem;

                img {
                    margin-right: .7rem;
                }
            }

            .notification-title {
                text-align: left;

                h4 {
                    font-size: 1.2rem !important;
                    color: #fff;
                }

                p {
                    color: #fff;
                }
            }
        }
    }
</style>