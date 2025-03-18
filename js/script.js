document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Toast提示函数
    function showToast(message) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.querySelector('.toast');
        
        toast.textContent = message;
        toastContainer.classList.add('toast-show');
        
        setTimeout(function() {
            toastContainer.classList.remove('toast-show');
        }, 2000);
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加active类到当前点击的按钮
            button.classList.add('active');
            
            // 找到相应的内容并显示
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // 根据当前标签自动执行生成操作
            switch(tabId) {
                case 'character':
                    document.getElementById('generate-character').click();
                    break;
                case 'sect':
                    document.getElementById('generate-sect').click();
                    break;
                case 'realm':
                    document.getElementById('generate-realm').click();
                    break;
                case 'location':
                    document.getElementById('generate-location').click();
                    break;
                case 'artifact':
                    document.getElementById('generate-artifact').click();
                    break;
                case 'pill':
                    document.getElementById('generate-pill').click();
                    break;
                case 'spell':
                    document.getElementById('generate-spell').click();
                    break;
            }
        });
    });
    
    // 随机取数组中的一个元素
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // 随机取数组中的N个不重复元素
    function getRandomElements(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // 生成角色姓名
    document.getElementById('generate-character').addEventListener('click', function() {
        const resultList = document.querySelector('#character-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32; // 生成10个名字
        const nameTypeOption = document.getElementById('name-type').value;
        const surnameTypeOption = document.getElementById('surname-type').value;
        const gender = document.getElementById('gender').value;
        const customSurname = document.getElementById('surname').value.trim();
        
        for (let i = 0; i < count; i++) {
            // 根据选项决定当前名字的类型
            let currentNameType;
            if (nameTypeOption === 'random') {
                currentNameType = Math.random() > 0.5 ? 'single' : 'double';
            } else {
                currentNameType = nameTypeOption;
            }
            
            // 根据选项决定当前姓氏的类型
            let currentSurnameType;
            if (surnameTypeOption === 'random') {
                currentSurnameType = Math.random() > 0.5 ? 'single' : 'double';
            } else {
                currentSurnameType = surnameTypeOption;
            }
            
            let surname;
            if (customSurname) {
                surname = customSurname;
            } else {
                if (currentSurnameType === 'single') {
                    surname = getRandomElement(commonSurnames);
                } else {
                    surname = getRandomElement(rareSurnames);
                }
            }
            
            let name = '';
            let nameChars;
            
            if (gender === 'male') {
                nameChars = [...maleNameChars, ...neutralNameChars];
            } else if (gender === 'female') {
                nameChars = [...femaleNameChars, ...neutralNameChars];
            } else {
                const randomGender = Math.random() > 0.5 ? 'male' : 'female';
                if (randomGender === 'male') {
                    nameChars = [...maleNameChars, ...neutralNameChars];
                } else {
                    nameChars = [...femaleNameChars, ...neutralNameChars];
                }
            }
            
            if (currentNameType === 'single') {
                name = getRandomElement(nameChars);
            } else {
                const firstName = getRandomElement(nameChars);
                // 确保第二个字不与第一个字相同
                let secondName;
                do {
                    secondName = getRandomElement(nameChars);
                } while (secondName === firstName);
                name = firstName + secondName;
            }
            
            const fullName = surname + name;
            
            // 创建结果项
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = fullName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(fullName).then(() => {
                    showToast('已复制到剪贴板: ' + fullName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 宗门后缀列表
    const sectSuffixList = ["宗", "门", "派", "阁", "观", "院", "殿", "山", "教", "盟", "阵", "庄"];
    
    // 生成宗门名称
    document.getElementById('generate-sect').addEventListener('click', function() {
        const resultList = document.querySelector('#sect-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32;
        const userSuffix = document.getElementById('sect-suffix').value.trim();
        
        for (let i = 0; i < count; i++) {
            // 如果用户没有输入后缀，每次都随机选择一个新的
            const suffix = userSuffix || getRandomElement(sectSuffixList);
            const prefix = getRandomElement(sectPrefixes);
            const sectName = prefix + suffix;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = sectName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(sectName).then(() => {
                    showToast('已复制到剪贴板: ' + sectName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 秘境后缀列表
    const realmSuffixList = ["境", "域", "界", "洞天", "福地", "秘境", "禁地", "天", "渊", "窟", "宫", "谷"];
    
    // 生成秘境名称
    document.getElementById('generate-realm').addEventListener('click', function() {
        const resultList = document.querySelector('#realm-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32;
        const userSuffix = document.getElementById('realm-suffix').value.trim();
        
        for (let i = 0; i < count; i++) {
            // 如果用户没有输入后缀，每次都随机选择一个新的
            const suffix = userSuffix || getRandomElement(realmSuffixList);
            const prefix = getRandomElement(realmPrefixes);
            const realmName = prefix + suffix;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = realmName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(realmName).then(() => {
                    showToast('已复制到剪贴板: ' + realmName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 地名后缀列表
    const locationSuffixList = ["山", "谷", "峰", "岭", "川", "河", "湖", "海", "林", "城", "镇", "国", "陵", "岛", "涧", "原", "坡", "崖"];
    
    // 生成地名
    document.getElementById('generate-location').addEventListener('click', function() {
        const resultList = document.querySelector('#location-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32;
        const userSuffix = document.getElementById('location-suffix').value.trim();
        
        for (let i = 0; i < count; i++) {
            // 如果用户没有输入后缀，每次都随机选择一个新的
            const suffix = userSuffix || getRandomElement(locationSuffixList);
            const prefix = getRandomElement(locationPrefixes);
            const locationName = prefix + suffix;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = locationName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(locationName).then(() => {
                    showToast('已复制到剪贴板: ' + locationName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 法宝类型列表
    const artifactTypeList = Object.keys(artifactPrefixes).concat(["塔", "尺", "锤", "斧", "杖", "笔", "筷", "针", "环", "镯", "符", "玉", "瓶", "铃", "爪", "鞭", "车", "弓"]);
    
    // 生成法宝名称
    document.getElementById('generate-artifact').addEventListener('click', function() {
        const resultList = document.querySelector('#artifact-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32;
        const userType = document.getElementById('artifact-type').value.trim();
        
        for (let i = 0; i < count; i++) {
            // 如果用户没有输入类型，每次都随机选择一个新的
            const type = userType || getRandomElement(artifactTypeList);
            
            // 检查是否在已知的法宝类型中
            let prefixes = artifactPrefixes[type];
            
            // 如果没有匹配的前缀，使用通用前缀
            if (!prefixes || prefixes.length === 0) {
                prefixes = [
                    "诛天", "斩妖", "屠魔", "太虚", "青冥", "紫电", "青锋", "赤霄", "轩辕", "太阿",
                    "惊鸿", "凌霄", "断魂", "弑神", "陨星", "天罡", "星辰", "斩神", "吞天", "紫霞"
                ];
            }
            
            const prefix = getRandomElement(prefixes);
            const artifactName = prefix + type;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = artifactName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(artifactName).then(() => {
                    showToast('已复制到剪贴板: ' + artifactName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 生成丹药名称
    document.getElementById('generate-pill').addEventListener('click', function() {
        const resultList = document.querySelector('#pill-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32;
        
        for (let i = 0; i < count; i++) {
            const prefix = getRandomElement(pillPrefixes);
            const suffix = getRandomElement(pillSuffixes);
            const pillName = prefix + suffix;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = pillName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(pillName).then(() => {
                    showToast('已复制到剪贴板: ' + pillName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 生成术法名称
    document.getElementById('generate-spell').addEventListener('click', function() {
        const resultList = document.querySelector('#spell-result .result-list');
        resultList.innerHTML = '';
        
        const count = 32;
        
        for (let i = 0; i < count; i++) {
            let spellName;
            const random = Math.random();
            
            if (random < 0.33) {
                // 类型+前缀
                const type = getRandomElement(spellTypes);
                const prefix = getRandomElement(spellPrefixes);
                spellName = prefix + type;
            } else if (random < 0.66) {
                // 前缀+效果+类型
                const prefix = getRandomElement(spellPrefixes);
                const effect = getRandomElement(spellEffects);
                const type = getRandomElement(spellTypes);
                spellName = prefix + effect + type;
            } else {
                // 前缀+类型
                const prefix = getRandomElement(spellPrefixes);
                const type = getRandomElement(spellTypes);
                spellName = prefix + type;
            }
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = spellName;
            resultItem.addEventListener('click', function() {
                navigator.clipboard.writeText(spellName).then(() => {
                    showToast('已复制到剪贴板: ' + spellName);
                });
            });
            
            resultList.appendChild(resultItem);
        }
    });
    
    // 默认生成一些结果
    document.getElementById('generate-character').click();
}); 