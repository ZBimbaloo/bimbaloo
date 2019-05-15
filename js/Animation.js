var animationList = new Array();
var animationTimerInterval = 1; // 单位ms
var animationTimerNowCount = 0;
var animationReadyList = new Array();
var animationListenerInterval = 10;
var animationBindList = new Array();
var animationListenerIsCreate = false;
var animationBindJoinListTimerCount = 0;

function AnimationJS() {
    this.version = function() {
        return 1.0;
    }
    this.setting = function(setName, val) {
        switch (setName) {
            case "timerInterval":
                animationTimerInterval = val;
                break;
            case "listenerInterval":
                animationListenerInterval = val;
                break;
            default:
                console.error("Animation.js: cannot find any setting!");
        }
    }
    this.create = function(name, attrType, from, to, prefix, suffix) {
        animationList[animationList.length] = name;
        animationList[animationList.length] = attrType;
        animationList[animationList.length] = from;
        animationList[animationList.length] = to;
        animationList[animationList.length] = suffix;
        animationList[animationList.length] = prefix;
    }
    this.do = function(el, name, time, callback) {
        var animationIsFind = false;
        for (var i = 0; i < animationList.length; i++) {
            if (i % 6 == 0 && animationList[i] == name) {
                animationIsFind = true;
                document.querySelector(el).style[animationList[i + 1]] = animationList[i + 2];
                var animationDividePart = parseFloat(animationList[i + 3] - animationList[i + 2]) / time;
                var timerCount = 1;
                var timerNowStyleVal = animationList[i + 2];
                animationTimerNowCount++;
                if (animationList[i + 4] != null && animationList[i + 4] != undefined && animationList[i + 4] != "") {
                    if (animationList[i + 5] != null && animationList[i + 5] != undefined && animationList[i + 5] != "") {
                        eval("var timer" + animationTimerNowCount + " = setInterval(function(){if(timerCount >= time){" + callback + ";clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal += parseFloat(animationDividePart);document.querySelector(el).style[animationList[i+1]] = '" + animationList[i + 5] + "'+timerNowStyleVal+'" + animationList[i + 4] + "';timerCount++;}," + animationTimerInterval + ");");
                    } else {
                        eval("var timer" + animationTimerNowCount + " = setInterval(function(){if(timerCount >= time){" + callback + ";clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal += parseFloat(animationDividePart);document.querySelector(el).style[animationList[i+1]] = timerNowStyleVal+'" + animationList[i + 4] + "';timerCount++;}," + animationTimerInterval + ");");
                    }
                } else {
                    if (animationList[i + 5] != null && animationList[i + 5] != undefined && animationList[i + 5] != "") {
                        eval("var timer" + animationTimerNowCount + " = setInterval(function(){if(timerCount >= time){" + callback + ";clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal = parseFloat(document.querySelector(el).style[animationList[i+1]])+parseFloat(animationDividePart);document.querySelector(el).style[animationList[i+1]] = '" + animationList[i + 5] + "'+timerNowStyleVal;timerCount++;}," + animationTimerInterval + ");");
                    } else {
                        eval("var timer" + animationTimerNowCount + " = setInterval(function(){if(timerCount >= time){" + callback + ";clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal = parseFloat(document.querySelector(el).style[animationList[i+1]])+parseFloat(animationDividePart);document.querySelector(el).style[animationList[i+1]] = timerNowStyleVal;timerCount++;}," + animationTimerInterval + ");");
                    }
                }
                break;
            }
        }
        if (!animationIsFind) {
            console.error("Animation.js: cannot find the animation!");
        }
    }
    this.joinList = function(el, name, time, callback) {
        animationReadyList[animationReadyList.length] = el;
        animationReadyList[animationReadyList.length] = name;
        animationReadyList[animationReadyList.length] = time;
        animationReadyList[animationReadyList.length] = callback;
    }
    this.getAllAnimationNames = function() {
        var animationNameList = new Array();
        for (var i = 0; i < animationList.length; i++) {
            if (i % 6 == 0) {
                animationNameList[animationNameList.length] = animationList[i];
            }
        }
        return animationNameList;
    }
    this.initListener = function() {
        if (!animationListenerIsCreate) {
            animationListenerIsCreate = true;
            //动画监听器
            var animationListenerCount = 0;
            animationListenerNowDoingElArr = new Array();
            setInterval(function() {
                if (animationListenerCount >= animationReadyList.length) {
                    animationListenerCount = 0;
                }
                if (animationListenerCount % 4 == 0) {
                    var animationListenerNowDoingTrue = false;
                    for (var i = 0; i < animationListenerNowDoingElArr.length; i++) {
                        if (animationListenerNowDoingElArr[i] == animationReadyList[animationListenerCount]) {
                            animationListenerNowDoingTrue = true;
                            break;
                        }
                    }
                    if (!animationListenerNowDoingTrue) {
                        animationListenerNowDoingElArr[animationListenerNowDoingElArr.length] = animationReadyList[animationListenerCount];
                        for (var i = 0; i < animationList.length; i++) {
                            if (i % 6 == 0 && animationList[i] == animationReadyList[animationListenerCount + 1]) {
                                document.querySelector(animationReadyList[animationListenerCount]).style[animationList[i + 1]] = animationList[i + 2];
                                var animationDividePart = parseFloat(animationList[i + 3] - animationList[i + 2]) / animationReadyList[animationListenerCount + 2];
                                animationTimerNowCount++;
                                if (animationList[i + 4] != null && animationList[i + 4] != undefined && animationList[i + 4] != "") {
                                    if (animationList[i + 5] != null && animationList[i + 5] != undefined && animationList[i + 5] != "") {
                                        eval("var timerNowStyleVal" + animationTimerNowCount + " = animationList[" + (i + 2) + "];var timerCount" + animationTimerNowCount + " = 1;var timer" + animationTimerNowCount + " = setInterval(function(){try{if(timerCount" + animationTimerNowCount + " >= " + animationReadyList[parseInt(animationListenerCount + 2)] + "){" + animationReadyList[parseInt(animationListenerCount + 3)] + ";animationReadyList[" + animationListenerCount + "] = '';animationReadyList[" + (animationListenerCount + 1) + "] = '';animationReadyList[" + (animationListenerCount + 2) + "] = '';animationListenerNowDoingElArr[" + parseInt(animationListenerNowDoingElArr.length - 1) + "] = '';animationListenerCount = 0;clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal" + animationTimerNowCount + " += parseFloat(" + animationDividePart + ");document.querySelector('" + animationReadyList[animationListenerCount] + "').style['" + animationList[(i + 1)] + "'] = '" + animationList[i + 5] + "'+timerNowStyleVal" + animationTimerNowCount + "+'" + animationList[i + 4] + "';timerCount" + animationTimerNowCount + "++;}catch(err){}}," + animationTimerInterval + ");");
                                    } else {
                                        eval("var timerNowStyleVal" + animationTimerNowCount + " = animationList[" + (i + 2) + "];var timerCount" + animationTimerNowCount + " = 1;var timer" + animationTimerNowCount + " = setInterval(function(){try{if(timerCount" + animationTimerNowCount + " >= " + animationReadyList[parseInt(animationListenerCount + 2)] + "){" + animationReadyList[parseInt(animationListenerCount + 3)] + ";animationReadyList[" + animationListenerCount + "] = '';animationReadyList[" + (animationListenerCount + 1) + "] = '';animationReadyList[" + (animationListenerCount + 2) + "] = '';animationListenerNowDoingElArr[" + parseInt(animationListenerNowDoingElArr.length - 1) + "] = '';animationListenerCount = 0;clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal" + animationTimerNowCount + " += parseFloat(" + animationDividePart + ");document.querySelector('" + animationReadyList[animationListenerCount] + "').style['" + animationList[(i + 1)] + "'] = timerNowStyleVal" + animationTimerNowCount + "+'" + animationList[i + 4] + "';timerCount" + animationTimerNowCount + "++;}catch(err){}}," + animationTimerInterval + ");");
                                    }
                                } else {
                                    if (animationList[i + 5] != null && animationList[i + 5] != undefined && animationList[i + 5] != "") {
                                        eval("var timerNowStyleVal" + animationTimerNowCount + " = animationList[" + (i + 2) + "];var timerCount" + animationTimerNowCount + " = 1;var timer" + animationTimerNowCount + " = setInterval(function(){try{if(timerCount" + animationTimerNowCount + " >= " + animationReadyList[parseInt(animationListenerCount + 2)] + "){" + animationReadyList[parseInt(animationListenerCount + 3)] + ";animationReadyList[" + animationListenerCount + "] = '';animationReadyList[" + (animationListenerCount + 1) + "] = '';animationReadyList[" + (animationListenerCount + 2) + "] = '';animationListenerNowDoingElArr[" + parseInt(animationListenerNowDoingElArr.length - 1) + "] = '';animationListenerCount = 0;clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal" + animationTimerNowCount + " += parseFloat(" + animationDividePart + ");document.querySelector('" + animationReadyList[animationListenerCount] + "').style['" + animationList[(i + 1)] + "'] = '" + animationList[i + 5] + "'+timerNowStyleVal" + animationTimerNowCount + ";timerCount" + animationTimerNowCount + "++;}catch(err){}}," + animationTimerInterval + ");");
                                    } else {
                                        eval("var timerNowStyleVal" + animationTimerNowCount + " = animationList[" + (i + 2) + "];var timerCount" + animationTimerNowCount + " = 1;var timer" + animationTimerNowCount + " = setInterval(function(){try{if(timerCount" + animationTimerNowCount + " >= " + animationReadyList[parseInt(animationListenerCount + 2)] + "){" + animationReadyList[parseInt(animationListenerCount + 3)] + ";animationReadyList[" + animationListenerCount + "] = '';animationReadyList[" + (animationListenerCount + 1) + "] = '';animationReadyList[" + (animationListenerCount + 2) + "] = '';animationListenerNowDoingElArr[" + parseInt(animationListenerNowDoingElArr.length - 1) + "] = '';animationListenerCount = 0;clearInterval(timer" + animationTimerNowCount + ");}timerNowStyleVal" + animationTimerNowCount + " += parseFloat(" + animationDividePart + ");document.querySelector('" + animationReadyList[animationListenerCount] + "').style['" + animationList[(i + 1)] + "'] = timerNowStyleVal" + animationTimerNowCount + ";timerCount" + animationTimerNowCount + "++;}catch(err){}}," + animationTimerInterval + ");");
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                animationListenerCount++;
            }, animationListenerInterval);
        } else {
            console.error("Animation.js: listener has been create!");
        }
    }
    this.bind = function(bindName, animationName) { // name参数用“&”分隔不同动画
        var animationBindNameSplit = animationName.split("&");
        animationBindList[animationBindList.length] = bindName;
        animationBindList[animationBindList.length] = animationBindNameSplit.length;
        for (var i = 0; i < animationBindNameSplit.length; i++) {
            animationBindList[animationBindList.length] = animationBindNameSplit[i];
        }
    }
    this.bindDo = function(el, bindName, time, callback) {
        for (var i = 0; i < animationBindList.length; i++) {
            if (animationBindList[i] == bindName) {
                for (var a = 0; a < animationBindList[i + 1]; a++) {
                    AnimationJS().do(el, animationBindList[a + 2], time, callback);
                }
                break;
            }
        }
    }
    this.bindJoinList = function(el, bindName, time, callback) {
        var animationListenerNowDoingTrue = false;
        for (var i = 0; i < animationListenerNowDoingElArr.length; i++) {
            if (animationListenerNowDoingElArr[i] == el) {
                animationListenerNowDoingTrue = true;
                eval("bindJoinListTimerIsSame" + animationBindJoinListTimerCount + " = false;var bindJoinListTimerCiShu" + animationBindJoinListTimerCount + " = 0;var bindJoinListTimer" + animationBindJoinListTimerCount + " = setInterval(function(){if(animationListenerNowDoingElArr[bindJoinListTimerCiShu" + animationBindJoinListTimerCount + "] == '" + el + "'){bindJoinListTimerIsSame" + animationBindJoinListTimerCount + " = true;}if(bindJoinListTimerCiShu" + animationBindJoinListTimerCount + " == animationListenerNowDoingElArr.length){if(!bindJoinListTimerIsSame" + animationBindJoinListTimerCount + "){clearInterval(bindJoinListTimer" + animationBindJoinListTimerCount + ");for(var i=0;i<animationBindList.length;i++){if(animationBindList[i] == bindName){for(var a=i;a<animationBindList[i+1]+i;a++){if(a == animationBindList[i+1]+i-1){if(!animationListenerIsCreate){AnimationJS().initListener();}AnimationJS().joinList(el,animationBindList[a+2],time,callback);}AnimationJS().do(el,animationBindList[a+2],time,callback);}break;}}}else{bindJoinListTimerIsSame" + animationBindJoinListTimerCount + " = false;};bindJoinListTimerCiShu" + animationBindJoinListTimerCount + " = 0;}bindJoinListTimerCiShu" + animationBindJoinListTimerCount + "++;},10);");
                animationBindJoinListTimerCount++;
                break;
            }
        }
        if (!animationListenerNowDoingTrue) {
            for (var i = 0; i < animationBindList.length; i++) {
                if (animationBindList[i] == bindName) {
                    for (var a = i; a < animationBindList[i + 1] + i; a++) {
                        if (a == animationBindList[i + 1] + i - 1) {
                            if (!animationListenerIsCreate) {
                                AnimationJS().initListener();
                            }
                            AnimationJS().joinList(el, animationBindList[a + 2], time, callback);
                        }
                        AnimationJS().do(el, animationBindList[a + 2], time, callback);
                    }
                    break;
                }
            }
        }
    }
    if (this == window) {
        return new AnimationJS();
    }
}

function aj() {
    if (this == window) {
        return new AnimationJS();
    }
}