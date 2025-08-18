// 构建时间戳 - 用于标识客户端构建版本
const buildTimestamp = "1754828397323"; 

// 字典映射表 - 用于映射游戏内部变量名，可能是为了适配不同版本或混淆保护
const dictionary = {
  "game":"aD",               // 游戏主对象
  "gIsReplay":"gw",          // 是否为回放模式
  "playerData":"ag",         // 玩家数据
  "rawPlayerNames":"a0m",    // 原始玩家名称
  "playerBalances":"gp",     // 玩家资源
  "playerTerritories":"gb",  // 玩家领土
  "gIsTeamGame":"hh",        // 是否为团队游戏
  "playerId":"eX",           // 当前玩家ID
  "playerNames":"yb",        // 玩家名称
  "gameState":"a08",         // 游戏状态
  "fontSize":"fontSize",     // 字体大小
  "x":"eu",                  // X坐标
  "y":"ew",                  // Y坐标
  "canvas":"hp",             // 画布对象
  "gHumans":"kA",            // 人类玩家数量
  "playerStates":"a3S",      // 玩家状态
  "fontGeneratorFunction":"bA.qa.sP", // 字体生成函数
  "gLobbyMaxJoin":"xD",      // 大厅最大加入人数
  "data":"data",             // 通用数据
  "playerCount":"playerCount", // 玩家数量
  "gBots":"kW",              // 机器人玩家数量
  "strs":"aAo",              // 字符串资源
  "gIsSingleplayer":"kU",    // 是否为单人游戏
  "uiSizes":"bc",            // UI尺寸
  "gap":"gap",               // 间隙大小
  "gMaxPlayers":"ek",        // 最大玩家数量
  "i":"aB",                  // 索引
  "MenuManager":"aa",        // 菜单管理器
  "getState":"a1J"           // 获取状态方法
};

// 自执行匿名函数 - 程序入口，使用严格模式
(()=>{"use strict";

  // 模块定义 - 类似CommonJS的模块系统
  var modules = {
    2862:(exports, module, require)=>{
      var m = require(6863);
      require(4151);
      exports.default = m;
    },
    5124:(exports, module, require)=>{
      require(9678);
      var m = require(7015);
      exports.default = m("Array","toReversed");
    },
    // 更多模块定义...
    6863:(exports, module, require)=>{
      var m = require(5124);
      exports.default = m;
    }
  };

  // 模块缓存
  const moduleCache = {};

  // 模块加载函数 - 实现模块的引入和执行
  function require(moduleId) {
    // 检查缓存
    if (moduleCache[moduleId]) {
      return moduleCache[moduleId].exports;
    }
    
    // 创建新模块
    const module = moduleCache[moduleId] = {
      exports: {}
    };
    
    // 执行模块代码
    modules[moduleId].call(module.exports, module, module.exports, require);
    return module.exports;
  }

  // 全局对象获取 - 兼容不同环境
  require.g = function(){
    if("object" == typeof globalThis) return globalThis;
    try { return this || new Function("return this")(); }
    catch(e) { if("object" == typeof window) return window; }
  }();

  // 版本信息 - 客户端版本和更新日志
  const versionInfo = JSON.parse('{"rE":"0.6.14","_e":"Aug 10","Ao":["Fix for game update v2.10.4","Fix error when opening donation history on older browsers"]}');

  // 数字格式化工具 - 将数字保留12位小数后转换为浮点数
  function formatNumber(num) {
    return parseFloat(num.toFixed(12));
  }

  // 攻击百分比快捷键输入组件构造函数
  function AttackPercentageKeybindsInput(container) {
    // 创建标题元素
    const title = document.createElement("p");
    title.innerText = "Attack Percentage Keybinds";
    
    // 创建输入容器
    const inputContainer = document.createElement("div");
    inputContainer.className = "arrayinput";
    
    // 创建添加按钮
    const addButton = document.createElement("button");
    addButton.innerText = "Add";
    
    // 组装DOM结构
    container.append(title, inputContainer, addButton);
    container.className = "keybinds-input";
    
    // 实例属性
    this.container = inputContainer;
    this.objectKeys = ["key", "type", "value"];  // 键绑定对象的属性
    this.objectArray = [];  // 存储键绑定配置的数组
    
    // 添加新的键绑定对象
    this.addObject = function() {
      this.objectArray.push({key: "", type: "absolute", value: 0.8});
      this.container.appendChild(this.createObjectElement(this.objectArray.length - 1));
      addButton.scrollIntoView(false);  // 滚动到按钮可见
    };
    
    // 绑定添加按钮事件
    addButton.addEventListener("click", this.addObject.bind(this));
    
    // 更新键绑定配置
    this.update = function(settings) {
      this.objectArray = settings.attackPercentageKeybinds;
      this.displayObjects();
    };
    
    // 显示所有键绑定对象
    this.displayObjects = function() {
      this.container.innerHTML = "";  // 清空容器
      
      // 如果没有配置，显示提示文本
      if (this.objectArray.length === 0) {
        this.container.innerText = "No custom attack percentage keybinds added";
        return;
      }
      
      // 遍历所有配置项并创建DOM元素
      for (let i = 0; i < this.objectArray.length; i++) {
        this.container.appendChild(this.createObjectElement(i));
      }
    };
    
    // 创建单个键绑定对象的DOM元素
    this.createObjectElement = function(index) {
      const element = document.createElement("div");
      
      // 为每个属性创建输入字段
      this.objectKeys.forEach(key => {
        element.appendChild(this.createInputField(index, key));
      });
      
      // 创建删除按钮
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", this.deleteObject.bind(this, index));
      element.appendChild(deleteButton);
      
      return element;
    };
    
    // 创建输入字段
    this.createInputField = function(index, key) {
      let input;
      
      // 根据键类型创建不同的输入控件
      if (key === "type") {
        // 类型选择下拉框
        input = document.createElement("select");
        input.innerHTML = `
          <option value="absolute">Absolute</option>
          <option value="relative">Relative</option>
        `;
        input.addEventListener("change", this.updateObject.bind(this, index, key));
      } 
      else if (key === "key") {
        // 按键输入框（只读，通过点击设置）
        input = document.createElement("input");
        input.type = "text";
        input.setAttribute("readonly", "");
        input.setAttribute("placeholder", "No key set");
        input.addEventListener("click", this.startKeyInput.bind(this, index, key));
      } 
      else {
        // 值输入框（根据类型显示不同格式）
        const isAbsolute = this.objectArray[index].type === "absolute";
        input = document.createElement("input");
        input.type = isAbsolute ? "text" : "number";
        
        if (isAbsolute) {
          // 绝对模式下点击转换为数字输入
          input.addEventListener("click", 
            this.convertIntoNumberInput.bind(this, index, key), { once: true });
        } else {
          input.setAttribute("step", "0.1");  // 相对模式使用步长
        }
        
        input.addEventListener("input", this.updateObject.bind(this, index, key));
      }
      
      // 设置输入框初始值
      if (key === "value" && this.objectArray[index].type === "absolute") {
        input.value = formatNumber(100 * this.objectArray[index][key]) + "%";
      } else {
        input.value = this.objectArray[index][key];
      }
      
      return input;
    };
    
    // 重新创建输入字段（用于类型切换时）
    this.recreateInputField = function(index, key) {
      const children = this.container.children[index].children;
      const indexOfKey = this.objectKeys.indexOf(key);
      children[indexOfKey].replaceWith(this.createInputField(index, key));
    };
    
    // 开始按键输入监听
    this.startKeyInput = function(index, key, event) {
      event.target.value = "Press any key";
      const updateHandler = this.updateObject.bind(this, index, key);
      
      // 监听按键事件
      event.target.addEventListener("keydown", updateHandler, { once: true });
      
      // 监听失去焦点事件（取消输入）
      event.target.addEventListener("blur", () => {
        event.target.removeEventListener("keydown", updateHandler);
        event.target.value = this.objectArray[index][key];
      }, { once: true });
    };
    
    // 将百分比输入框转换为数字输入框
    this.convertIntoNumberInput = function(index, key, event) {
      event.target.value = event.target.value.slice(0, -1);  // 移除百分号
      event.target.type = "number";
      
      // 失去焦点时恢复显示格式
      event.target.addEventListener("blur", () => {
        this.recreateInputField(index, key);
      }, { once: true });
    };
    
    // 更新对象属性值
    this.updateObject = function(index, key, event) {
      if (index >= this.objectArray.length) return;
      
      let value;
      if (key === "value") {
        // 根据类型处理值
        if (this.objectArray[index].type === "absolute") {
          value = formatNumber(parseFloat(event.target.value) / 100);
        } else {
          value = parseFloat(event.target.value);
        }
      } else if (key === "key") {
        // 按键值直接使用事件的key属性
        value = event.key;
      } else {
        // 其他类型直接使用输入值
        value = event.target.value;
      }
      
      // 更新数组中的值
      this.objectArray[index][key] = value;
      
      // 如果是按键或类型变更，重新创建输入框
      if (key === "key") {
        this.recreateInputField(index, key);
      } else if (key === "type") {
        this.recreateInputField(index, "value");
      }
    };
    
    // 删除键绑定对象
    this.deleteObject = function(index) {
      this.objectArray.splice(index, 1);
      this.displayObjects();
    };
    
    return this;
  }

  // 胜率统计管理器
  const winCounter = {
    count: 0,  // 胜场数
    
    // 重置胜率统计
    removeWins: function() {
      if (confirm("Do you really want to reset your wins?")) {
        winCounter.count = 0;
        localStorage.removeItem("fx_winCount");
        alert("Successfully reset wins");
      }
    }
  };

  // 从本地存储加载胜率数据
  if (localStorage.getItem("fx_winCount") !== null) {
    winCounter.count = localStorage.getItem("fx_winCount");
  }

  // 窗口管理器 - 存储所有窗口引用
  let windowManager = {};

  // 获取窗口容器
  const windowContainer = document.getElementById("windowContainer");

  // 添加窗口到管理器
  function addWindow(windowConfig) {
    windowManager[windowConfig.name] = windowConfig;
    windowManager[windowConfig.name].isOpen = false;
  }

  // 关闭指定窗口
  function closeWindow(windowName) {
    if (windowManager[windowName].isOpen !== false) {
      windowManager[windowName].isOpen = false;
      windowManager[windowName].element.style.display = "none";
      // 如果有关闭回调，执行它
      if (windowManager[windowName].onClose !== undefined) {
        windowManager[windowName].onClose();
      }
    }
  }

  // 关闭所有窗口
  function closeAllWindows() {
    Object.values(windowManager).forEach(window => {
      if (window.closable !== false) {
        closeWindow(window.name);
      }
    });
  }

  // 点击窗口外区域关闭所有窗口
  document.addEventListener("mousedown", (event) => {
    if (!windowContainer.contains(event.target)) {
      closeAllWindows();
    }
    // 如果启用全屏模式，尝试进入全屏
    if (settingsManager.getSettings().useFullscreenMode) {
      enterFullscreen();
    }
  }, { passive: true, capture: true });

  // 触摸屏上点击画布关闭所有窗口
  document.getElementById("canvasA").addEventListener("touchstart", closeAllWindows, { passive: true });

  // 按ESC键关闭所有窗口
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllWindows();
    }
  });

  // 窗口系统核心功能
  const WindowSystem = {
    // 创建新窗口
    create: function(config) {
      const windowElement = document.createElement("div");
      windowElement.className = "window" + (config.classes ? " " + config.classes : " scrollable selectable");
      windowElement.style.display = "none";  // 默认隐藏
      
      // 如果需要关闭按钮
      if (config.closeWithButton === true) {
        const closeButton = document.createElement("button");
        closeButton.addEventListener("click", () => closeWindow(config.name));
        closeButton.textContent = "Close";
        // 延迟添加按钮以确保DOM已准备好
        setTimeout(() => windowElement.appendChild(closeButton));
      }
      
      // 添加到窗口容器
      windowContainer.appendChild(windowElement);
      addWindow({...config, element: windowElement});
      return windowElement;
    },
    
    add: addWindow,
    
    // 打开指定窗口
    openWindow: function(windowName, ...args) {
      if (windowManager[windowName].isOpen !== true) {
        // 如果有打开前回调，执行它
        if (windowManager[windowName].beforeOpen !== undefined) {
          windowManager[windowName].beforeOpen(...args);
        }
        windowManager[windowName].isOpen = true;
        windowManager[windowName].element.style.display = null;  // 显示窗口
      }
    },
    
    closeWindow: closeWindow,
    closeAll: closeAllWindows
  };

  // 创建更新日志窗口
  const { Ao: changelog, rE: version } = versionInfo;
  const changelogWindow = WindowSystem.create({ name: "changelog", closeWithButton: true });
  
  // 构建更新日志内容
  const changelogTitle = document.createElement("h1");
  changelogTitle.textContent = "What's new";
  
  const versionInfoElement = document.createElement("p");
  versionInfoElement.textContent = `in FX Client v${version}`;
  
  const changelogList = document.createElement("ul");
  
  // 填充更新日志列表
  changelog.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    changelogList.appendChild(listItem);
  });
  
  // 组装更新日志窗口
  changelogWindow.append(changelogTitle, versionInfoElement, changelogList);

  // 全局FX对象 - 用于暴露API
  window.__fx = window.__fx || {};
  const fx = window.__fx;

  // 默认设置
  const defaultSettings = {
    displayWinCounter: true,          // 显示胜率计数器
    useFullscreenMode: false,         // 使用全屏模式
    hoveringTooltip: true,            // 悬停提示
    realisticNames: false,            // 真实的机器人名称
    showPlayerDensity: true,          // 显示玩家密度
    coloredDensity: true,             // 彩色密度显示
    densityDisplayStyle: "absoluteQuotient", // 密度显示样式
    hideBotNames: false,              // 隐藏机器人名称
    highlightClanSpawns: false,       // 高亮 clan 出生点
    detailedTeamPercentage: false,    // 详细的团队百分比
    openDonationHistoryFromLb: true,  // 从排行榜打开捐赠历史
    customBackgroundUrl: "",          // 自定义背景图片URL
    keybindButtons: false,            // 快捷键按钮
    attackPercentageKeybinds: []      // 攻击百分比快捷键
  };

  // 初始化设置
  fx.settings = defaultSettings;

  // 不保存的设置键列表
  const excludedSettings = ["hideAllLinks", "fontName"];

  // 主菜单透明设置
  fx.makeMainMenuTransparent = false;

  // 设置管理器
  const settingsManager = new function() {
    // 设置项配置
    const settingsConfig = [
      {
        for: "displayWinCounter",
        type: "checkbox",
        label: "Display win counter",
        note: "The win counter tracks multiplayer solo wins (not in team games)"
      },
      {
        type: "button",
        text: "Reset win counter",
        action: winCounter.removeWins
      },
      {
        for: "useFullscreenMode",
        type: "checkbox",
        label: "Use fullscreen mode",
        note: "Note: fullscreen mode will trigger after you click anywhere on the page due to browser policy restrictions."
      },
      {
        for: "hoveringTooltip",
        type: "checkbox",
        label: "Hovering tooltip",
        note: "Display map territory info constantly (on mouse hover) instead of only when right clicking on the map"
      },
      {
        for: "realisticNames",
        type: "checkbox",
        label: "Realistic Bot Names"
      },
      {
        for: "showPlayerDensity",
        type: "checkbox",
        label: "Show player density"
      },
      {
        for: "coloredDensity",
        type: "checkbox",
        label: "Colored density",
        note: "Display the density with a color between red and green depending on the density value"
      },
      {
        for: "densityDisplayStyle",
        type: "selectMenu",
        label: "Density value display style:",
        tooltip: "Controls how the territorial density value should be rendered",
        options: [
          { value: "percentage", label: "Percentage" },
          { value: "absoluteQuotient", label: "Value from 0 to 150 (BetterTT style)" }
        ]
      },
      {
        for: "hideBotNames",
        type: "checkbox",
        label: "Hide bot names"
      },
      {
        for: "highlightClanSpawns",
        type: "checkbox",
        label: "Highlight clan spawnpoints",
        note: "Increases the spawnpoint glow size for members of your clan"
      },
      {
        for: "detailedTeamPercentage",
        type: "checkbox",
        label: "Detailed team pie chart percentage",
        note: "For example: this would show 25.82% instead of 26% on the pie chart in team games"
      },
      {
        for: "openDonationHistoryFromLb",
        type: "checkbox",
        label: "Open donation history from the leaderboard",
        note: "Changes whether or not clicking on a player's name in the in-game leaderboard in team games will open their donation history"
      },
      {
        for: "customBackgroundUrl",
        type: "textInput",
        label: "Custom main menu background:",
        placeholder: "Enter an image URL here",
        tooltip: "A custom image to be shown as the main menu background instead of the currently selected map."
      },
      // 攻击百分比快捷键输入组件
      (container) => new AttackPercentageKeybindsInput(container),
      {
        for: "keybindButtons",
        type: "checkbox",
        label: "Keybind buttons",
        note: "Show keybind buttons above the troop selector (max 6)"
      },
      // 版本信息和链接
      (container) => {
        const versionElement = document.createElement("p");
        versionElement.innerText = `FX Client v${versionInfo.rE}`;
        
        const linksElement = document.createElement("p");
        linksElement.innerHTML = `
          <a href="https://discord.gg/dyxcwdNKwK" target="_blank">Discord server</a> |
          <a href="https://github.com/fxclient/FXclient#readme">Github repository</a>
        `;
        
        const changelogButton = document.createElement("button");
        changelogButton.innerText = "Changelog";
        changelogButton.addEventListener("click", () => WindowSystem.openWindow("changelog"));
        
        container.append(versionElement, linksElement, changelogButton);
      }
    ];

    // 获取设置面板容器
    const settingsPanel = document.querySelector(".settings .scrollable");
    
    // 存储输入控件的引用
    const textInputs = {};
    const checkboxes = {};
    const dynamicComponents = [];

    // 初始化设置面板
    settingsConfig.forEach(item => {
      // 如果是函数组件，直接执行
      if (typeof item === "function") {
        const container = document.createElement("div");
        dynamicComponents.push(new item(container));
        settingsPanel.append(container);
        return;
      }
      
      // 创建标签元素
      const label = document.createElement("label");
      if (item.tooltip) {
        label.title = item.tooltip;
      }
      
      // 判断是否为输入类型
      const isInput = item.type.endsWith("Input");
      
      // 创建输入控件
      const input = document.createElement(
        isInput || item.type === "checkbox" ? "input" : 
        item.type === "selectMenu" ? "select" : "button"
      );
      
      // 文本输入框设置
      if (item.type === "textInput") {
        input.type = "text";
      }
      
      // 设置占位符
      if (item.placeholder) {
        input.placeholder = item.placeholder;
      }
      
      // 存储文本输入和选择菜单的引用
      if (isInput || item.type === "selectMenu") {
        textInputs[item.for] = input;
      }
      
      // 设置按钮文本
      if (item.text) {
        input.innerText = item.text;
      }
      
      // 绑定按钮点击事件
      if (item.action) {
        input.addEventListener("click", item.action);
      }
      
      // 添加标签文本
      if (item.label) {
        label.append(item.label + " ");
      }
      
      // 添加说明文本
      if (item.note) {
        const note = document.createElement("small");
        note.innerText = item.note;
        label.append(document.createElement("br"), note);
      }
      
      // 添加选项到选择菜单
      if (item.options) {
        item.options.forEach(option => {
          const optionElement = document.createElement("option");
          optionElement.setAttribute("value", option.value);
          optionElement.innerText = option.label;
          input.append(optionElement);
        });
      }
      
      // 添加输入控件到标签
      label.append(input);
      
      // 处理复选框样式
      if (item.type === "checkbox") {
        input.type = "checkbox";
        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";
        label.className = "checkbox";
        label.append(checkmark);
        checkboxes[item.for] = input;
      } else {
        label.append(document.createElement("br"));
      }
      
      // 添加到设置面板
      settingsPanel.append(label, document.createElement("br"));
    });

    // 保存设置
    this.save = function() {
      // 保存文本输入和选择菜单的值
      Object.keys(textInputs).forEach(key => {
        fx.settings[key] = textInputs[key].value.trim();
      });
      
      // 保存复选框的值
      Object.keys(checkboxes).forEach(key => {
        fx.settings[key] = checkboxes[key].checked;
      });
      
      // 应用设置
      this.applySettings();
      
      // 关闭设置窗口
      WindowSystem.closeWindow("settings");
      
      // 排除不需要保存的设置
      excludedSettings.forEach(key => delete fx.settings[key]);
      
      // 保存到本地存储
      localStorage.setItem("fx_settings", JSON.stringify(fx.settings));
      
      // 重新加载页面使设置生效
      window.location.reload();
    };

    // 导入设置文件
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    
    function handleFileImport(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // 移除事件监听器
      event.target.removeEventListener("change", handleFileImport);
      event.target.value = "";
      
      // 验证文件格式
      if (!file.name.endsWith(".json")) {
        alert("Invalid file format");
        return;
      }
      
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = function() {
        try {
          const importedSettings = JSON.parse(reader.result);
          // 确认覆盖当前设置
          if (confirm('Warning: This will override all current settings, click "OK" to confirm')) {
            fx.settings = defaultSettings = importedSettings;
            localStorage.setItem("fx_settings", JSON.stringify(fx.settings));
            window.location.reload();
          }
        } catch (error) {
          alert("Error\n" + error);
        }
      };
      reader.readAsText(file);
    }
    
    this.importFromFile = function() {
      fileInput.click();
      fileInput.addEventListener("change", handleFileImport);
    };

    // 导出设置到文件
    this.exportToFile = function() {
      const settingsJson = JSON.stringify(fx.settings);
      const blob = new Blob([settingsJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "FX_client_settings.json";
      a.click();
      
      // 释放URL对象
      URL.revokeObjectURL(url);
    };

    // 同步表单字段与设置值
    this.syncFields = function() {
      Object.keys(textInputs).forEach(key => {
        textInputs[key].value = fx.settings[key];
      });
      
      Object.keys(checkboxes).forEach(key => {
        checkboxes[key].checked = fx.settings[key];
      });
      
      // 更新动态组件
      dynamicComponents.forEach(component => {
        if (component.update) {
          component.update(fx.settings);
        }
      });
    };

    // 重置所有设置
    this.resetAll = function() {
      if (confirm("Are you Really SURE you want to RESET ALL SETTINGS back to the default?")) {
        localStorage.removeItem("fx_settings");
        window.location.reload();
      }
    };

    // 应用设置
    this.applySettings = function() {
      // 应用自定义背景
      if (fx.settings.customBackgroundUrl !== "") {
        document.body.style.backgroundImage = `url(${fx.settings.customBackgroundUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      }
      
      // 设置主菜单透明
      fx.makeMainMenuTransparent = fx.settings.customBackgroundUrl !== "";
    };

    // 进入全屏模式
    function enterFullscreen() {
      if (document.fullscreenElement === null && document.fullscreenEnabled) {
        document.documentElement.requestFullscreen({ navigationUI: "hide" })
          .then(() => console.log("Fullscreen mode activated"))
          .catch(error => console.warn("Could not enter fullscreen mode:", error));
      }
    }

    // 如果设置了全屏模式，尝试进入
    if (fx.settings.useFullscreenMode) {
      enterFullscreen();
    }
  };

  // 添加设置窗口到窗口系统
  WindowSystem.add({
    name: "settings",
    element: document.querySelector(".settings"),
    beforeOpen: () => settingsManager.syncFields()
  });

  // 从本地存储加载设置
  if (localStorage.getItem("fx_settings") !== null) {
    fx.settings = { ...defaultSettings, ...JSON.parse(localStorage.getItem("fx_settings")) };
  }

  // 应用设置
  settingsManager.applySettings();

  // 获取当前设置的辅助函数
  function getCurrentSettings() {
    return fx.settings;
  }

  // 游戏数据访问辅助函数
  // 定义不同类型的游戏数据键
  const playerDataKeys = ["playerTerritories", "playerBalances", "rawPlayerNames"];
  const gameStateKeys = ["playerId", "gIsTeamGame", "gHumans", "gLobbyMaxJoin", "gameState", "gIsSingleplayer"];

  // 获取游戏数据
  function getGameData(key) {
    if (playerDataKeys.includes(key)) {
      // 玩家数据从playerData对象获取
      return window[dictionary.playerData]?.[dictionary[key]];
    } else if (gameStateKeys.includes(key)) {
      // 游戏状态数据从game对象获取
      return window[dictionary.game]?.[dictionary[key]];
    } else {
      // 其他数据直接从window获取
      return window[dictionary[key]];
    }
  }

  // 获取间隙大小
  function getGapSize() {
    return Math.floor(getGameData("uiSizes")?.[dictionary.gap] ?? 10);
  }

  // 排行榜过滤器
  const LeaderboardFilter = new function() {
    this.playersToInclude = [];  // 要显示的玩家
    this.tabLabels = ["ALL", "CLAN"];  // 标签页名称
    this.filteredLeaderboard = [];  // 过滤后的排行榜
    this.tabBarOffset = 0;  // 标签栏偏移
    this.windowWidth = 0;  // 窗口宽度
    this.verticalClickThreshold = 1000;  // 垂直点击阈值
    this.hoveringOverTabs = false;  // 是否悬停在标签上
    this.scrollToTop = () => {};  // 滚动到顶部的函数
    this.repaintLeaderboard = () => {};  // 重绘排行榜的函数
    this.setUpdateFlag = () => {};  // 设置更新标志的函数
    this.parseClanFromPlayerName = () => {  // 从玩家名称解析clan的函数
      console.warn("parse function not set");
    };
    this.selectedTab = 0;  // 当前选中的标签
    this.tabHovering = -1;  // 当前悬停的标签
    this.enabled = false;  // 是否启用过滤

    // 绘制标签页
    this.drawTabs = function(ctx, width, yPos, height, activeColor) {
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      const tabWidth = width / this.tabLabels.length;
      const textY = yPos + this.tabBarOffset / 2;
      
      this.tabLabels.forEach((label, index) => {
        // 绘制分隔线
        if (index !== 0) {
          ctx.fillRect(tabWidth * index, yPos, 1, this.tabBarOffset);
        }
        
        // 绘制选中的标签背景
        if (this.selectedTab === index) {
          ctx.fillStyle = activeColor;
          ctx.fillRect(tabWidth * index, yPos, tabWidth, this.tabBarOffset);
          ctx.fillStyle = "rgb(255,255,255)";
        }
        
        // 绘制悬停的标签背景
        if (this.tabHovering === index) {
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fillRect(tabWidth * index, yPos, tabWidth, this.tabBarOffset);
          ctx.fillStyle = "rgb(255,255,255)";
        }
        
        // 绘制标签文本
        ctx.fillText(label, tabWidth * index + tabWidth / 2, textY);
      });
    };

    // 设置悬停状态
    this.setHovering = function(isHovering, xPos) {
      let needsUpdate = false;
      
      if (isHovering) {
        // 计算悬停的标签索引
        const hoveredTab = Math.floor(xPos / (this.windowWidth / this.tabLabels.length));
        if (this.tabHovering !== hoveredTab) {
          this.tabHovering = hoveredTab;
          needsUpdate = true;
        }
      }
      
      // 检查悬停状态是否变化
      if (isHovering !== this.hoveringOverTabs) {
        this.hoveringOverTabs = isHovering;
        
        // 离开悬停状态时重置
        if (!isHovering) {
          this.tabHovering = -1;
          needsUpdate = true;
        }
      }
      
      // 如果需要更新，重绘排行榜
      if (needsUpdate) {
        this.repaintLeaderboard();
      }
      
      return isHovering;
    };

    // 处理鼠标点击
    this.handleMouseDown = function(xPos) {
      const clickedTab = Math.floor(xPos / (this.windowWidth / this.tabLabels.length));
      
      if (this.selectedTab !== clickedTab) {
        this.selectedTab = clickedTab;
        
        // 根据选中的标签执行过滤
        if (this.selectedTab === 0) {
          this.clearFilter();
        } else if (this.selectedTab === 1) {
          this.filterByOwnClan();
          this.setUpdateFlag();
        }
        
        this.repaintLeaderboard();
      }
      
      return true;
    };

    // 按自己的clan过滤
    this.filterByOwnClan = function() {
      this.playersToInclude = [];
      const playerId = getGameData("playerId");
      const myName = getGameData("rawPlayerNames")[playerId];
      const myClan = this.parseClanFromPlayerName(myName);
      
      // 遍历所有玩家，筛选同clan成员
      getGameData("rawPlayerNames").forEach((name, index) => {
        if (index !== playerId && this.parseClanFromPlayerName(name) !== myClan) {
          return;
        }
        this.playersToInclude.push(index);
      });
      
      this.enabled = true;
      this.scrollToTop();
    };

    // 清除过滤
    this.clearFilter = function() {
      this.enabled = false;
    };

    // 重置过滤器
    this.reset = function() {
      this.enabled = false;
      this.selectedTab = 0;
      ClanFilter.refresh();
    };
  };

  // Clan过滤器
  const ClanFilter = new function() {
    this.inOwnClan = new Array(512);  // 存储玩家是否在自己的clan中
    this.inOwnClan.fill(false);  // 初始化
    
    // 刷新clan信息
    this.refresh = function() {
      const humanPlayers = getGameData("gHumans");
      const playerId = getGameData("playerId");
      const myName = getGameData("rawPlayerNames")[playerId];
      const myClan = LeaderboardFilter.parseClanFromPlayerName(myName);
      
      // 如果没有clan信息，重置
      if (myClan === null) {
        this.inOwnClan.fill(false);
        return;
      }
      
      // 检查每个玩家是否在自己的clan中
      getGameData("rawPlayerNames").forEach((name, index) => {
        this.inOwnClan[index] = index < humanPlayers && 
          LeaderboardFilter.parseClanFromPlayerName(name) === myClan;
      });
    };
  };

  // HTML转义函数
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 错误追踪变量
  let currentError = null;

  // 加载必要的模块
  require(2862);

  // 添加捐赠历史窗口
  WindowSystem.add({
    name: "donationHistory",
    element: document.querySelector("#donationhistory"),
    beforeOpen: function() {
      document.getElementById("donationhistory_note").style.display = "none";
    },
    onClose: function() {
      DonationTracker.openedWindowPlayerID = null;
    }
  });

  // 捐赠跟踪器
  const DonationTracker = new function() {
    this.openedWindowPlayerID = null;  // 当前打开窗口的玩家ID
    this.contentElement = document.querySelector("#donationhistory_content");  // 内容容器
    this.donationHistory = Array(512);  // 捐赠历史数组
    let resetCalled = false;  // 重置标记

    // 创建捐赠记录行
    function createDonationRow(donation, index, currentPlayerId) {
      const { rawPlayerNames } = getGameData;
      const row = document.createElement("tr");
      
      // 标记新记录
      if (donation.isNew) {
        row.setAttribute("class", "new");
        delete donation.isNew;
      }
      
      let content = `<td><span class="color-light-gray">${index}.</span> `;
      
      // 根据捐赠方向显示不同内容
      if (donation[1] === currentPlayerId) {
        // 收到捐赠
        content += `Received <span class="color-green">${donation[2]}</span> resources from ${escapeHtml(getGameData("rawPlayerNames")[donation[0]])}`;
      } else {
        // 发送捐赠
        content += `Sent <span class="color-red">${donation[2]}</span> resources to ${escapeHtml(getGameData("rawPlayerNames")[donation[1]])}`;
      }
      
      content += "</td>";
      row.innerHTML = content;
      return row;
    }

    // 获取指定玩家的捐赠历史
    this.getHistoryOf = function(playerId) {
      // 错误处理包装
      function getHistory() {
        return this.donationHistory[playerId].toReversed();
      }
      
      try {
        return getHistory.call(this);
      } catch (error) {
        // 记录错误上下文
        currentError = playerId;
        setTimeout(() => { if (currentError === playerId) currentError = null; }, 0);
        throw error;
      }
    };

    // 重置捐赠历史
    this.reset = function() {
      resetCalled = true;
      for (let i = 0; i < 512; i++) {
        this.donationHistory[i] = [];
      }
    };

    // 记录捐赠
    this.logDonation = function(from, to, amount) {
      const donation = [from, to, amount];
      
      // 添加到双方的历史记录
      this.donationHistory[to].push(donation);
      this.donationHistory[from].push(donation);
      
      // 如果当前打开了捐赠窗口，更新显示
      if (this.openedWindowPlayerID === from || this.openedWindowPlayerID === to) {
        const targetPlayerId = this.openedWindowPlayerID === from ? from : to;
        const historyLength = this.donationHistory[targetPlayerId].length;
        // 标记为新记录
        donation.isNew = true;
        this.contentElement.prepend(createDonationRow(donation, historyLength, targetPlayerId));
      }
    };

    // 显示指定玩家的捐赠历史
    this.displayHistory = function(playerId, playerNames = getGameData("rawPlayerNames"), isSingleplayer = getGameData("gIsSingleplayer")) {
      try {
        const history = this.getHistoryOf(playerId);
        console.log("History for " + playerNames[playerId] + ":", history);
        
        // 更新标题
        document.querySelector("#donationhistory h1").innerHTML = 
          "Donation history for " + escapeHtml(playerNames[playerId]);
        
        // 清空内容
        this.contentElement.innerHTML = "";
        
        // 显示历史记录
        if (history.length > 0) {
          history.forEach((donation, index) => {
            this.contentElement.appendChild(
              createDonationRow(donation, history.length - index, playerId)
            );
          });
        } else {
          this.contentElement.innerText = "Nothing to display";
        }
        
        // 记录当前打开窗口的玩家ID
        this.openedWindowPlayerID = playerId;
        
        // 打开捐赠历史窗口
        WindowSystem.openWindow("donationHistory", isSingleplayer);
      } catch (error) {
        console.error("Error displaying donation history:", error);
      }
    };
  };

  // 玩家列表管理器
  const PlayerListManager = new function() {
    // 创建玩家图标
    const playerIcon = document.createElement("img");
    playerIcon.setAttribute("src", "assets/players_icon.png");
    
    // 玩家列表点击事件 - 查看捐赠历史
    document.getElementById("playerlist_content").addEventListener("click", (event) => {
      const playerId = event.target.closest("tr[data-player-id]")?.getAttribute("data-player-id");
      if (playerId && getGameData("gIsTeamGame")) {
        WindowSystem.closeWindow("playerList");
        DonationTracker.displayHistory(parseInt(playerId));
      }
    });

    // 显示玩家列表
    this.display = function(playerNames) {
      const humanPlayers = getGameData("gHumans");
      const maxPlayers = getGameData("gLobbyMaxJoin");
      
      let html = `<h3>Players (${humanPlayers})</h3>`;
      
      // 遍历所有玩家位置
      for (let i = 0; i < maxPlayers; i++) {
        // 机器人部分标题
        if (i === humanPlayers) {
          html += `<h3>Bots (${maxPlayers - humanPlayers})</h3>`;
        }
        
        // 添加玩家行
        html += `<tr data-player-id="${i}">
                  <td><span class="color-light-gray">${i + 1}.</span> ${escapeHtml(playerNames[i])}
                  </td>
                </tr>`;
      }
      
      // 更新内容并设置可点击性（团队游戏中）
      document.getElementById("playerlist_content").innerHTML = html;
      document.getElementById("playerlist_content").setAttribute(
        "class", getGameData("gIsTeamGame") ? "clickable" : ""
      );
      
      // 打开玩家列表窗口
      WindowSystem.openWindow("playerList");
    };

    this.hoveringOverButton = false;  // 是否悬停在按钮上

    // 绘制玩家列表按钮
    this.drawButton = (ctx, x, y, size, fillColor) => {
      // 绘制按钮背景
      ctx.fillRect(x, y, size, size);
      ctx.fillStyle = this.hoveringOverButton ? "#aaaaaaaa" : "#000000aa";
      ctx.clearRect(x + 1, y + 1, size - 2, size - 2);
      ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
      
      // 绘制图标
      ctx.fillStyle = "#ffffff";
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(playerIcon, x + 2, y + 2, size - 4, size - 4);
      ctx.imageSmoothingEnabled = false;
    };
  };

  // 添加玩家列表窗口
  WindowSystem.add({
    name: "playerList",
    element: document.getElementById("playerlist")
  });

  // 工具函数集合
  const Utils = {
    // 获取最大部队数量
    getMaxTroops: function(playerBalances, index) {
      return (150 * playerBalances[index]).toString();
    },
    
    // 获取领土密度
    getDensity: function(playerIndex, balances = getGameData("playerBalances"), territories = getGameData("playerTerritories")) {
      if (getCurrentSettings().densityDisplayStyle === "percentage") {
        // 百分比显示
        const territoriesCount = territories[playerIndex] || 1;
        return ((balances[playerIndex] / (150 * territoriesCount)) * 100).toFixed(1) + "%";
      } else {
        // 绝对值显示
        const territoriesCount = territories[playerIndex] || 1;
        return (balances[playerIndex] / territoriesCount).toFixed(1);
      }
    },
    
    // 检查点是否在矩形内
    isPointInRectangle: function(x, y, rectX, rectY, rectWidth, rectHeight) {
      return x >= rectX && x <= rectX + rectWidth && 
             y >= rectY && y <= rectY + rectHeight;
    },
    
    // 绘制多行文本
    fillTextMultiline: function(ctx, text, x, y, maxWidth) {
      // 从字体样式中提取字体大小
      const fontSize = parseInt(ctx.font.split(" ").find(part => part.endsWith("px")).slice(0, -2));
      
      // 按换行符分割并绘制每行文本
      text.split("\n").forEach((line, index) => {
        ctx.fillText(line, x, y + index * fontSize, maxWidth);
      });
    },
    
    // 根据密度获取文本样式
    textStyleBasedOnDensity: function(playerIndex) {
      const balances = getGameData("playerBalances");
      const territories = getGameData("playerTerritories");
      const territoriesCount = territories[playerIndex] || 1;
      return `hsl(${balances[playerIndex] / (1.5 * territoriesCount)}, 100%, 50%, 1)`;
    }
  };

  // 悬停提示管理器
  const HoverTooltip = new function() {
    let isProcessing = false;  // 防止重复处理
    
    // 处理鼠标/触摸移动事件
    function handlePointerMove(event) {
      // 如果禁用了悬停提示或游戏未就绪，直接返回
      if (!getCurrentSettings().hoveringTooltip || !getGameData("gameState") || isProcessing) {
        return;
      }
      
      let clientX, clientY;
      
      // 处理触摸事件
      if (event.type.includes("touch")) {
        const touchEvent = event.originalEvent || event;
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
        clientX = touch.pageX;
        clientY = touch.pageY;
      } 
      // 处理鼠标事件
      else if (event.type.includes("mouse")) {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      
      // 标记为正在处理
      isProcessing = true;
      
      try {
        this.active = true;
        // 显示提示（实际实现由外部提供）
        this.display(this.canvasPixelScale * clientX, this.canvasPixelScale * clientY);
        this.active = false;
      } catch (error) {
        console.error(error);
      } finally {
        // 延迟重置处理标记，防止性能问题
        setTimeout(() => isProcessing = false, 100);
      }
    }
    
    this.display = () => {};  // 显示提示的函数（由外部实现）
    this.active = false;  // 是否正在显示提示
    this.canvasPixelScale = 1;  // 画布缩放比例
    
    // 监听鼠标和触摸事件
    document.getElementById("canvasA").addEventListener("mousemove", handlePointerMove.bind(this));
    document.getElementById("canvasA").addEventListener("touchstart", handlePointerMove.bind(this));
  };

  // 攻击百分比控制
  const AttackPercentageControls = {
    setAbsolute: () => {},  // 设置绝对百分比
    setRelative: () => {},  // 设置相对百分比
    repaintAttackPercentageBar: () => {}  // 重绘攻击百分比条
  };

  // 应用攻击百分比设置
  function applyAttackPercentage(setting) {
    if (setting.type === "absolute") {
      AttackPercentageControls.setAbsolute(setting.value);
    } else {
      AttackPercentageControls.setRelative(setting.value);
    }
    AttackPercentageControls.repaintAttackPercentageBar();
  }

  // 移动快捷键管理器
  const MobileKeybinds = {
    canvas: null,  // 快捷键画布
    width: 0,      // 宽度
    height: 0,     // 高度
    
    // 设置快捷键按钮大小
    setSize: (width, height, font) => {
      // 如果禁用了快捷键按钮，直接返回
      if (!getCurrentSettings().keybindButtons) return;
      
      MobileKeybinds.width = width;
      MobileKeybinds.height = height;
      
      // 创建画布
      MobileKeybinds.canvas = document.createElement("canvas");
      MobileKeybinds.canvas.width = width;
      MobileKeybinds.canvas.height = height;
      
      const ctx = MobileKeybinds.canvas.getContext("2d");
      const fontName = font.split("px ", 2)[1];
      
      // 设置字体
      ctx.font = `bold ${height / 2}px ${fontName}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // 获取并限制快捷键数量（最多6个）
      const keybinds = getCurrentSettings().attackPercentageKeybinds.slice(0, 6);
      const gap = getGapSize() / 4;
      const buttonWidth = (width - 5 * gap) / 6;
      
      // 绘制每个快捷键按钮
      keybinds.forEach((bind, index) => {
        // 绘制按钮背景
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(index * (buttonWidth + gap), 0, buttonWidth, height);
        
        // 绘制按钮文本
        ctx.fillStyle = "white";
        let text;
        if (bind.type === "absolute") {
          text = (100 * bind.value).toFixed() + "%";
        } else {
          text = "x " + Math.round(100 * bind.value) / 100;
        }
        ctx.fillText(text, (index + 0.5) * (buttonWidth + gap), height / 2);
      });
    },
    
    // 处理点击事件
    click: (xPos) => {
      if (xPos < 0 || xPos > MobileKeybinds.width) return false;
      
      const keybinds = getCurrentSettings().attackPercentageKeybinds;
      const buttonIndex = Math.floor(xPos / MobileKeybinds.width * 6);
      
      // 检查索引是否有效
      if (buttonIndex >= keybinds.length) return false;
      
      // 应用对应的攻击百分比
      applyAttackPercentage(keybinds[buttonIndex]);
      return true;
    },
    
    // 绘制快捷键
    draw: (ctx, x, y) => {
      if (MobileKeybinds.canvas) {
        ctx.drawImage(MobileKeybinds.canvas, x, y - (MobileKeybinds.height + getGapSize() / 4));
      }
    }
  };

  // 自定义游戏大厅相关变量
  let isInCustomLobby = false;
  let lobbyCode = "";
  let joinLobbyFunction = () => {};
  let leaveLobbyFunction = () => {};
  let sendLobbyMessageFunction = (type, data) => {};

  // 文本编码解码器
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  // 添加自定义大厅加入窗口
  WindowSystem.add({
    name: "lobbyJoinMenu",
    element: document.getElementById("customLobbyJoinMenu")
  });

  // 创建自定义大厅不可用提示窗口
  WindowSystem.create({
    name: "customLobbiesUnavailable",
    closeWithButton: true
  }).innerHTML = `
    <p>The latest version of FX Client doesn't support custom lobbies yet. 
    Use the stable version at <a href="https://fxclient.github.io/custom-lobbies/">
    https://fxclient.github.io/custom-lobbies</a></p>
  `;

  // 创建自定义大厅窗口
  const customLobbyWindow = WindowSystem.create({
    name: "customLobby",
    classes: "scrollable selectable flex-column text-align-center",
    closable: false
  });

  // 自定义大厅标题
  const lobbyTitle = document.createElement("h2");
  lobbyTitle.textContent = "Custom Lobby";

  // 主内容区域
  const lobbyMainContent = document.createElement("div");
  lobbyMainContent.className = "customlobby-main";

  // 玩家列表区域
  const playerListContainer = document.createElement("div");
  const playerCountText = document.createElement("p");
  playerCountText.textContent = "0 Players";
  const playersContainer = document.createElement("div");
  playerListContainer.append(playerCountText, playersContainer);

  // 设置区域
  const settingsContainer = document.createElement("div");
  settingsContainer.className = "text-align-left";

  // 大厅设置配置
  const lobbySettings = {
    mode: {
      label: "Mode:",
      type: "selectMenu",
      options: [
        { value: 0, label: "2 Teams" },
        { value: 1, label: "3 Teams" },
        { value: 2, label: "4 Teams" },
        { value: 3, label: "5 Teams" },
        { value: 4, label: "6 Teams" },
        { value: 5, label: "7 Teams" },
        { value: 6, label: "8 Teams" },
        { value: 7, label: "Battle Royale" },
        { value: 10, label: "No Fullsend Battle Royale" },
        { value: 9, label: "Zombie mode" }
      ]
    },
    map: {
      label: "Map:",
      type: "selectMenu"
    },
    difficulty: {
      label: "Difficulty:",
      type: "selectMenu",
      options: [
        { value: 0, label: "Very Easy (Default)" },
        { value: 1, label: "Easy (1v1)" },
        { value: 2, label: "Normal" },
        { value: 3, label: "Hard" },
        { value: 4, label: "Very Hard" },
        { value: 5, label: "Impossible" }
      ]
    },
    spawnSelection: {
      label: "Spawn selection",
      type: "checkbox"
    },
    botCount: {
      label: "Bot & player count:",
      type: "numberInput",
      attributes: { min: "1", max: "512" }
    }
  };

  // 存储设置控件和值
  const settingElements = {};
  const settingValues = {};

  // 更新设置值
  function updateSettingValue(key, value) {
    if (lobbySettings[key].type === "checkbox") {
      settingElements[key].checked = value !== 0;
    } else {
      settingElements[key].value = value.toString();
    }
    settingValues[key] = value;
  }

  // 处理设置变更
  function handleSettingChange(key, event) {
    sendLobbyMessageFunction("options", [key, parseInt(event.target.value)]);
  }

  // 处理复选框变更
  function handleCheckboxChange(key, event) {
    sendLobbyMessageFunction("options", [key, event.target.checked ? 1 : 0]);
  }

  // 创建设置控件
  Object.entries(lobbySettings).forEach(([key, config]) => {
    const label = document.createElement("label");
    if (config.tooltip) {
      label.title = config.tooltip;
    }

    const isInput = config.type.endsWith("Input");
    const input = document.createElement(
      isInput || config.type === "checkbox" ? "input" : 
      config.type === "selectMenu" ? "select" : "button"
    );

    // 存储控件引用
    settingElements[key] = input;

    // 设置输入类型
    if (config.type === "textInput") {
      input.type = "text";
    } else if (config.type === "numberInput") {
      input.type = "number";
    }

    // 设置占位符
    if (config.placeholder) {
      input.placeholder = config.placeholder;
    }

    // 绑定变更事件
    if (isInput || config.type === "selectMenu") {
      input.addEventListener("change", handleSettingChange.bind(null, key));
    }

    // 设置按钮文本
    if (config.text) {
      input.innerText = config.text;
    }

    // 绑定按钮点击事件
    if (config.action) {
      input.addEventListener("click", config.action);
    }

    // 添加标签文本
    if (config.label) {
      label.append(config.label + " ");
    }

    // 添加说明文本
    if (config.note) {
      const note = document.createElement("small");
      note.innerText = config.note;
      label.append(document.createElement("br"), note);
    }

    // 添加选项到选择菜单
    if (config.options) {
      config.options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", option.value);
        optionElement.textContent = option.label;
        input.append(optionElement);
      });
    }

    // 设置属性
    if (config.attributes) {
      Object.entries(config.attributes).forEach(([attr, value]) => {
        input.setAttribute(attr, value);
      });
    }

    // 添加输入控件到标签
    label.append(input);

    // 处理复选框样式
    if (config.type === "checkbox") {
      input.type = "checkbox";
      const checkmark = document.createElement("span");
      checkmark.className = "checkmark";
      label.className = "checkbox";
      label.append(checkmark);
      input.addEventListener("change", handleCheckboxChange.bind(null, key));
    } else {
      label.append(document.createElement("br"));
    }

    // 添加到设置容器
    settingsContainer.append(label);
  });

  // 组装主内容
  lobbyMainContent.append(playerListContainer, settingsContainer);

  // 创建底部按钮区域
  const lobbyFooter = document.createElement("footer");
  lobbyFooter.style.marginTop = "10px";

  // 创建按钮辅助函数
  function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  // 创建大厅控制按钮
  const startGameButton = createButton("Start game", () => {
    WindowSystem.closeWindow("customLobby");
    sendLobbyMessageFunction("startGame");
  });

  const leaveLobbyButton = createButton("Leave lobby", () => {
    leaveLobbyFunction();
  });

  const copyLinkButton = createButton("Copy link", () => {
    navigator.clipboard.writeText(`${window.location.href}#lobby=${lobbyCode}`);
    copyLinkButton.textContent = "Copied!";
    setTimeout(() => copyLinkButton.textContent = "Copy link", 1000);
  });

  // 添加按钮到底部
  lobbyFooter.append(startGameButton, leaveLobbyButton, copyLinkButton);

  // 组装自定义大厅窗口
  customLobbyWindow.append(lobbyTitle, lobbyMainContent, lobbyFooter);

  // 处理大厅代码输入
  document.getElementById("lobbyCode").addEventListener("input", ({ target }) => {
    if (target.value.length === 5) {
      lobbyCode = target.value.toLowerCase();
      target.value = "";
      WindowSystem.closeWindow("lobbyJoinMenu");
      isInCustomLobby = true;
      joinLobbyFunction();
    }
  });

  // 创建大厅按钮点击事件
  document.getElementById("createLobbyButton").addEventListener("click", () => {
    lobbyCode = "";
    WindowSystem.closeWindow("lobbyJoinMenu");
    isInCustomLobby = true;
    joinLobbyFunction();
  });

  // 大厅玩家管理变量
  let localPlayerElement = null;
  let isLobbyHost = false;
  let lobbyPlayers = [];

  // 创建玩家状态标记
  function createStatusBadge(text, visible) {
    const badge = document.createElement("span");
    badge.textContent = text;
    badge.className = visible ? "" : "d-none";
    return badge;
  }

  // 添加玩家到大厅列表
  function addLobbyPlayer(player) {
    const playerElement = document.createElement("div");
    playerElement.className = "lobby-player";
    playerElement.textContent = player.name;

    // 创建踢人按钮（仅房主可见）
    const kickButton = document.createElement("button");
    kickButton.textContent = "Kick";
    kickButton.className = isLobbyHost && !player.isHost ? "" : "d-none";
    kickButton.addEventListener("click", handleKickPlayer);

    // 创建状态标记
    const hostBadge = createStatusBadge("Host", player.isHost);
    const inGameBadge = createStatusBadge("In Game", player.inGame);

    // 组装玩家元素
    playerElement.append(hostBadge, inGameBadge, kickButton);
    playersContainer.append(playerElement);

    // 存储玩家元素引用
    lobbyPlayers.push({
      element: playerElement,
      hostBadge: hostBadge,
      inGameBadge: inGameBadge,
      kickButton: kickButton,
      isHost: player.isHost,
      inGame: player.inGame
    });
  }

  // 处理踢人操作
  function handleKickPlayer(event) {
    const button = event.target;
    for (let i = 0; i < lobbyPlayers.length; i++) {
      if (lobbyPlayers[i].kickButton === button) {
        sendLobbyMessageFunction("kick", i);
        break;
      }
    }
  }

  // 更新玩家计数
  function updatePlayerCount() {
    playerCountText.textContent = `${lobbyPlayers.length} Player${lobbyPlayers.length === 1 ? "" : "s"}`;
  }

  // 处理哈希变化（加入大厅）
  function handleHashChange() {
    if (window.location.hash.startsWith("#lobby=")) {
      WindowSystem.openWindow("customLobbiesUnavailable");
    }
  }

  // 监听哈希变化事件
  window.addEventListener("hashchange", handleHashChange);

  // 自定义大厅API
  const CustomLobby = {
    gameInfo: settingValues,  // 游戏信息
    
    // 显示加入提示
    showJoinPrompt: function() {
      WindowSystem.openWindow("customLobbiesUnavailable");
    },
    
    // 处理自定义消息
    isCustomMessage: function(data) {
      // 检查消息标识
      if (data[0] !== 120) return false;
      
      // 空消息处理
      if (data.length === 1) return true;
      
      // 解码消息
      const uint8Array = new Uint8Array(data.buffer, 1);
      const message = JSON.parse(textDecoder.decode(uint8Array));
      const { t: type, d: dataContent } = message;
      
      // 处理不同类型的消息
      if (type === "lobby") {
        // 大厅信息
        WindowSystem.openWindow("customLobby");
        lobbyTitle.textContent = "Custom Lobby " + dataContent.code;
        lobbyCode = dataContent.code;
        isLobbyHost = dataContent.isHost;
        
        // 更新按钮状态
        startGameButton.disabled = !isLobbyHost;
        if (isLobbyHost) {
          settingsContainer.classList.remove("disabled");
        } else {
          settingsContainer.classList.add("disabled");
        }
        
        // 更新设置
        Object.entries(dataContent.options).forEach(([key, value]) => {
          updateSettingValue(key, value);
        });
        
        // 重置玩家列表
        const { players, id } = dataContent;
        lobbyPlayers = [];
        playersContainer.innerHTML = "";
        players.forEach(addLobbyPlayer);
        localPlayerElement = lobbyPlayers[id];
        
        // 更新玩家计数
        updatePlayerCount();
      } 
      else if (type === "addPlayer") {
        // 添加玩家
        addLobbyPlayer({ name: dataContent.name, inGame: false, isHost: false });
        updatePlayerCount();
      } 
      else if (type === "removePlayer") {
        // 移除玩家
        const index = dataContent;
        lobbyPlayers[index].element.remove();
        lobbyPlayers.splice(index, 1);
        updatePlayerCount();
      } 
      else if (type === "inLobby") {
        // 玩家在大厅中
        const index = dataContent;
        lobbyPlayers[index].inGame = false;
        lobbyPlayers[index].inGameBadge.className = "d-none";
      } 
      else if (type === "options") {
        // 更新设置
        const [key, value] = dataContent;
        updateSettingValue(key, value);
      } 
      else if (type === "setHost") {
        // 设置房主
        const index = dataContent;
        lobbyPlayers[index].isHost = true;
        lobbyPlayers[index].hostBadge.className = "";
      } 
      else if (type === "host") {
        // 成为房主
        isLobbyHost = true;
        startGameButton.disabled = false;
        settingsContainer.classList.remove("disabled");
        lobbyPlayers.forEach(player => {
          if (!player.isHost) {
            player.kickButton.className = "";
          }
        });
      } 
      else if (type === "serverMessage") {
        // 服务器消息
        alert(dataContent);
      }
      
      return true;
    },
    
    // 获取WebSocket连接URL
    getSocketURL: function() {
      return "wss://fx.peshomir.workers.dev/" + (lobbyCode === "" ? "create" : "join?" + lobbyCode);
    },
    
    // 获取本地玩家ID
    getPlayerId: function() {
      let count = 0;
      for (let i = 0; i < lobbyPlayers.length; i++) {
        const player = lobbyPlayers[i];
        if (player === localPlayerElement) {
          return count;
        }
        if (!player.inGame) {
          count++;
        }
      }
    },
    
    // 设置加入函数
    setJoinFunction: function(func) {
      joinLobbyFunction = func;
      setTimeout(handleHashChange, 0);
    },
    
    // 设置离开函数
    setLeaveFunction: function(func) {
      leaveLobbyFunction = func;
    },
    
    // 设置发送消息函数
    setSendFunction: function(func) {
      sendLobbyMessageFunction = func;
    },
    
    // 设置地图信息
    setMapInfo: function(maps) {
      setTimeout(() => {
        // 填充地图选择下拉框
        const mapOptions = maps.map((map, index) => ({
          value: index.toString(),
          label: map.name
        }));
        populateSelectOptions(settingElements.map, mapOptions);
      }, 0);
    },
    
    // 重新加入大厅
    rejoinLobby: function() {
      joinLobbyFunction();
    },
    
    // 隐藏大厅窗口
    hideWindow: function() {
      WindowSystem.closeWindow("customLobby");
    },
    
    // 检查是否活跃
    isActive: () => isInCustomLobby,
    
    // 设置活跃状态
    setActive: function(active) {
      isInCustomLobby = active;
      if (!active) {
        WindowSystem.closeWindow("customLobby");
      }
    }
  };

  // 填充选择框选项
  function populateSelectOptions(selectElement, options) {
    // 清空现有选项
    selectElement.innerHTML = "";
    // 添加新选项
    options.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.value);
      optionElement.textContent = option.label;
      selectElement.append(optionElement);
    });
  }

  // 版本检查与更新日志
  const { rE: currentVersion, _e: buildDate } = versionInfo;
  const storedVersion = localStorage.getItem("fx_version");

  // 如果版本更新，显示更新日志
  if (storedVersion !== currentVersion) {
    localStorage.setItem("fx_version", currentVersion);
    if (storedVersion !== null) {
      // 显示更新日志
      WindowSystem.openWindow("changelog");
    }
  }

  // 暴露API到全局
  window.__fx = window.__fx || {};
  const fxAPI = window.__fx;

  // 版本信息
  fxAPI.version = currentVersion + " " + buildDate;
  
  // 核心功能API
  fxAPI.settingsManager = settingsManager;
  fxAPI.leaderboardFilter = LeaderboardFilter;
  fxAPI.utils = Utils;
  fxAPI.WindowManager = WindowSystem;
  fxAPI.keybindFunctions = AttackPercentageControls;
  fxAPI.keybindHandler = key => {
    const keybind = getCurrentSettings().attackPercentageKeybinds.find(bind => bind.key === key);
    if (keybind) {
      if (getGameData("gameState") !== 0) {
        applyAttackPercentage(keybind);
      }
      return true;
    }
    return false;
  };
  fxAPI.mobileKeybinds = MobileKeybinds;
  fxAPI.donationsTracker = DonationTracker;
  
  // 错误报告功能
  fxAPI.reportError = function(error, context) {
    function getGameValue(key) {
      try {
        return getGameData(key);
      } catch (e) {
        return e.toString();
      }
    }
    
    // 构建错误信息
    const errorDetails = `${error.filename} ${error.lineno} ${error.colno} ${error.message}\n${context}`;
    
    // 发送错误报告
    fetch("https://fx.peshomir.workers.dev/stats/errors", {
      body: JSON.stringify({
        message: errorDetails,
        context: {
          debug: currentError,
          gameState: getGameValue("gameState"),
          singleplayer: getGameValue("gIsSingleplayer"),
          swState: navigator.serviceWorker?.controller?.state,
          location: window.location.toString(),
          userAgent: navigator.userAgent,
          dictionary: JSON.stringify(dictionary),
          buildTimestamp,
          scripts: Array.from(document.scripts).map(script => script.src)
        }
      }),
      method: "POST"
    }).catch(e => alert("Failed to report error: " + e));
  };
  
  // 其他功能API
  fxAPI.playerList = PlayerListManager;
  fxAPI.hoveringTooltip = HoverTooltip;
  fxAPI.clanFilter = ClanFilter;
  fxAPI.wins = winCounter;
  fxAPI.customLobby = CustomLobby;

  // 初始化完成
  console.log("Successfully loaded FX Client");
})();
