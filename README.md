## 知觉决策中自我优势效应的神经机制

### 1. 文件夹结构

```
└── 1_Protocol # 重要参考和通用模板（持续更新）
|     
└── 2_Experiments
│    └── 2_1_pilot_Experiment  # 预实验相关文件
│    |    └── 2_1_1_Procedure  # 实验程序
│    |    |    └── jsPsych-matching_tasks_template  # jsPsych 任务模板
│    |    |    └── pilot_expt_1a  # 预实验 1a 
|    |    |    └── pilot_expt_v3  # 预实验 v3 
|    |    |    └── pilot_expt_v4  # 预实验 v4 
|    |    └── 2_1_2_RawData  # 原始数据
|    |    └── 2_1_3_CleanData  # 清洗后的数据
|    └── 2_2_Formal_Experiment  # 正式实验相关文件（待更新）
└── 3_Analysis  
|    └── 3_1_pilot_expt_1a  # 预实验 1a 分析
|         └── output  # 输出
|    └── 3_2_pilot_expt_v3  # 预实验 v3 分析
|         └── output  # 输出
└── 4_Reports  
     └── 4_1_FirsTime  
     └── 4_2_SecondTime(pilot_expt_1a)  # 预实验 1a 报告
     └── 4_3_pilot_expt_v3  # 预实验 v3 报告

```

### 2. 内容说明

**1_Protocol 文件夹**
- 功能：存放项目通用协议、参考文献等。
- 子文件夹与文件：
  - 1_1_reference：关键参考文献、领域综述及理论框架文档（分理论与方法）；
  - 1_2_pre_material：通用模板，包含知情同意书、签名表和被试费报销单。

**2_Experiments 文件夹**
- 功能：存放实验程序代码、原始数据和清洗后的数据。
- 子文件夹与文件：
  - 2_1_pilot_Experiment 
    - 2.1.1_Procedure （实验程序）：
      - jsPsych-matching_tasks_template：基于 jsPsych 框架的匹配任务模板，可参考里面的代码；
      - pilot_expt_1a：第二次预实验：
      - pilot_expt_v3：第三次预实验：实现阶梯程序
      - pilot_expt_v4：第四次预实验：控制任务难度、调整刺激大小。
    - 2.1.2_RawData：all文件里的为第四次预实验数据的汇总 。
    - 2.1.3_CleanData：经过异常值剔除、数据格式统一后的标准化数据集。
  - 2.2 Formal_Experiment：待更新内容： 实验方案、实验程序及停止收集数据的代码。
  
**3_Analysis 文件夹**
- 功能：存放数据分析脚本及输出。
  - 3_1_pilot_expt_1a：实验1a的初步结果，仅作为参考。
  - 3_2_pilot_expt_v3： 这里面的代码有拟合心理物理函数的，如有需要可参考。
  - 3_2_pilot_expt_v4：v4的分析主要为查看不同难度水平下的正确率、计算贝叶斯序列因子。

**4_Reports 文件夹**
  - 4.1_FirsTime
  - 4.2_SecondTime(pilot_expt_1a)
  - 4.3_pilot_expt_v3

### 3. 项目进度与待完成事项
**已完成：**
- 预实验 1a、v3、v4的数据采集与分析；
- 正式实验1a的实验方案；
- 正式实验1a的实验程序；
- 停止数据收集的贝叶斯序列因子代码；

**待完成：**
- 实验1a预注册；
- 实验1a正式数据收集；
- 优化实验2a设计
