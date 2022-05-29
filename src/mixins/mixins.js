export default {
    data: () => ({
        childReady: false,
        index: 0,
    }),
    methods: {
        dataCollectionFromForm(item) {
            return {
                title: item.elements.title.value,
                task: item.elements.task.value,
                time: item.elements.time.value,
                id: Date.now(),
                status: new Date(item.elements.time.value) < Date.now() ? 'overdue' : 'inWork'
            };
        },
        createTimer(item, index, taskId) {
            let timer = document.querySelectorAll(".timer").length === 1 ? document.querySelector(".timer") : document.querySelectorAll(".timer")[index],
                days = timer.querySelector(".timer-days"),
                hours = timer.querySelector(".timer-hours"),
                minutes = timer.querySelector(".timer-minutes"),
                seconds = timer.querySelector(".timer-seconds"),
                animation = setInterval(set, 1000, this);

            set(this);

            function set(a) {
                let t = getDifference(item);
                if (t.time <= 0) {
                    let task = a.$store.getters.getTaskById(taskId);
                    task.status = 'overdue';
                    a.$store.dispatch('updateTaskList', task);
                    clearInterval(animation);
                    return;
                }

                days.textContent = setZero(t.days);
                hours.textContent = setZero(t.hours);
                minutes.textContent = setZero(t.minutes);
                seconds.textContent = setZero(t.seconds);
            };

            function setZero(item) {
                if (item < 10) {
                    return `0${item}`;
                } else {
                    return item;
                }
            };

            function getDifference(deadLine) {
                let time = Date.parse(deadLine) - Date.now();
                let days = Math.floor(time / 1000 / 60 / 60 / 24),
                    hours = Math.floor((time / 1000 / 60 / 60) % 24),
                    minutes = Math.floor((time / 1000 / 60) % 60),
                    seconds = Math.floor((time / 1000) % 60);

                return {
                    time,
                    days,
                    hours,
                    minutes,
                    seconds,
                };
            };
        },
        runTimer(item, taskId) {
            if (this.childReady) {
                this.createTimer(item, this.index, taskId);
                this.index++;
            } else {
                setTimeout(() => {
                    this.createTimer(item, this.index, taskId);
                    this.index++;
                }, 100);
            }
        },
    }
};