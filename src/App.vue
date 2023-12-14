<script></script>

<template>
    <div class="main">
        <div class="container1">
            <h1 class="title">Demo dự án<br />Hệ Thống<br />Đèn Thông Minh</h1>
            <div class="camArea">
                <button id="webcamButton">Mở Camera</button>
                <video id="webcam" class="invisible" autoplay playsinline></video>
            </div>
        </div>
        <div class="container2">
            <div class="status">
                <h3 class="status__title"><span>Trạng Thái Database</span></h3>
                <div class="status__container">
                    <span class="status__data">Đang kết nối</span>
                </div>
            </div>

            <div class="person">
                <h3 class="person__title">Số Người</h3>
                <div class="person__container">
                    <span class="person__data"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.container1,
.container2 {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.container1 {
    width: 50%;
}

.title {
    text-transform: uppercase;
    font-size: 50px;
    line-height: 60px;
    height: 180px;
    margin: 34px 0;
}

.camArea {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 3px solid #a3a3a3;
    background: rgba(255, 255, 255, 0.44);
}

#webcam {
    height: 330px;
}

#webcamButton {
    border-radius: 3px;
    border: 2px solid #4d4d4d;
    background: rgba(255, 255, 255, 0);
    width: 150px;
    height: 50px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.3s;
}

#webcamButton:hover {
    background: #4d4d4d;
    color: #d7d7d7;
}

.container2 {
    margin: 0 20px;
    flex: 1;
}

.status {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 3px solid #a3a3a3;
    background: rgba(255, 255, 255, 0.44);
    height: 180px;
    margin: 34px 0;
}

.status__title,
.person__title {
    font-size: 15px;
    height: 30%;
    background-color: rgb(246, 246, 246);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid #a3a3a3;
    font-size: 20px;
}

.status__data {
    font-size: 25px;
}

.person {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 3px solid #a3a3a3;
    background: rgba(255, 255, 255, 0.44);
    height: 180px;
}

.status__container,
.person__container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.person__data {
    font-size: 100px;
}
</style>
