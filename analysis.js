// window.addEventListener("load", () => {
//     monitorList();
// });
let invokeUser;
const monitorList = () => {
    const invokeUserElement = document.querySelector("#invokeUser");
    invokeUser = invokeUserElement.value;

    if (invokeUser.length > 0) {
        resetAnalysisList();
        invokeUserElement.disable = true;

        new EventSource(`http://localhost:8080/api-test/analysis/${invokeUser}`, {
            withCredentials: true,
        }).onmessage = ({ data }) => {
            const item = JSON.parse(data);
            const step = document.querySelector(`.step-${item.id}`);

            if (step) {
                updateItem(item);
            } else {
                drawItem(item);
            }
        };
    }
};

const resetAnalysisList = () => {
    document.querySelector(".analysis-list").innerHTML = "";
};

const addBulkAnalysis = () => {
    const idS = parseInt(document.querySelector("#id-s").value);
    const idE = parseInt(document.querySelector("#id-e").value);

    for (let i = idS; i <= idE; i++) {
        // itemMonitoring(`id${i}`);
        addAnalysis(i);
    }
};

const addAnalysis = (i) => {
    const id = (i || document.querySelector("#id").value) + "";
    const algorithm = document.querySelector("#algorithm").value;
    invokeUser = document.querySelector("#invokeUser").value;

    if (id.length > 0 && algorithm.length > 0) {
        fetch(`http://localhost:8080/api-test/analysis/${invokeUser}/id${id}?algorithm=${algorithm}`, {
            method: "POST",
        });
    }
};

const drawItem = ({ id, invokeUser, step, totalStep }) => {
    const analysisList = document.querySelector(".analysis-list");
    analysisList.innerHTML += `<div>
            <span>${id}</span>
            <span>${invokeUser}</span>
            <span class="step-${getClassOfStep(step, totalStep)} step-${id}">
                ${getSquares(step, totalStep)}
            </span>
        </div>`;
};

const getClassOfStep = (step, totalStep) => {
    const percentageOfStep = (parseInt(step) / parseInt(totalStep)) * 100;

    if (percentageOfStep <= 25) {
        return 0;
    } else if (percentageOfStep <= 50) {
        return 1;
    } else if (percentageOfStep <= 75) {
        return 2;
    } else {
        return 3;
    }
};

const getSquares = (step, totalStep) => {
    let squares = [];
    for (let i = 0; i <= step; i++) {
        squares.push(`■`);
    }
    for (let i = step; i < totalStep; i++) {
        squares.push(`□`);
    }
    return squares.join("");
};

const updateItem = ({ id, step, totalStep }) => {
    const statusEle = document.querySelector(`.step-${id}`);
    statusEle.innerHTML = getSquares(step, totalStep);
    statusEle.className = `step-${getClassOfStep(step, totalStep)} step-${id}`;
};
