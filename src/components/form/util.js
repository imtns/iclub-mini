// 内置校验规则
const presetRules = {
  number: { pattern: /^\d+(\.\d+)?$/, errorMessage: '仅允许输入数字' },
  letter: { pattern: /^[A-Za-z]+$/, errorMessage: '仅允许输入英文字母' },
  chinese: { pattern: /^[\u4E00-\u9FA5]+$/, errorMessage: '仅允许输入汉字' },
  phone: { pattern: /^1\d{10}$/, errorMessage: '请输入11位手机号码' },
  nationalId: { pattern: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/, errorMessage: '请输入正确的身份证号码' }
}

// label展示
export function getShowLabel(model, field) {
  return field.value || model[field.code] || ''
}

// 是否展示填写提示 && 返回填写提示的位置
export function getExtraPosition(field) {
  // labelPosition为top时，展示在label下面；labelPosition为left时，展示在form-item下面
  if (field.props && field.props.extra) {
    return field.labelPosition === 'top' ? 'top' : 'bottom'
  }

  return ''
}

// 公共rule
export function getCommonRules(field) {
  const rules = []
  const props = field.props || {}

  // 必填校验
  const txt = {
    'form-radio': '选择',
    'form-checkbox': '选择',
    'form-select': '选择',
    'form-date': '选择',
    'form-rate': '选择',
    'form-image': '上传',
    'form-video': '上传',
    'form-department-select': '选择',
    'form-departmentAll-select': '选择'
  }[field.type] || '填写'

  if (getInputRequireRules(field, txt)) {
    rules.push(getInputRequireRules(field, txt))
  }

  // 内置规则快捷校验
  if (props && props.validate) {
    rules.push(getPresetRules(props.validate))
  }

  // 自定义校验规则 - 当内置规则快捷校验满足不了时
  if (props && props.rules) {
    rules.push(...props.rules)
  }

  return rules
}

/**
 * 添加内置校验规则
 * @param formRules 规则对象
 * @param code 规则key
 * @param ruleKey 规则名称
 */
export function setPresetRules(formRules, code, ruleKey) {
  if (presetRules[ruleKey]) {
    formRules[code].push(presetRules[ruleKey])
  }
}
// 获取内置规则
export function getPresetRules(ruleKey) {
  if (presetRules[ruleKey]) {
    return presetRules[ruleKey]
  }
}

/**
 * 必填项规则
 * @param formRules 规则对象
 * @param code 规则key
 * @param label 展示名称
 */
// 必填校验规则
export function getInputRequireRules(field, txt) {
  return field.required ? { required: true, errorMessage: field.errorMessage || `请${txt || '输入'}${field.label}` } : null
}
