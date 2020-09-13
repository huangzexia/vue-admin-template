// 递归
export function recursion(data: any, code: string) {
    let result: any = null;
    if (!data) {
        return;
    }
    for (const i of Object.keys(data)) {
        const item = data[i];
        if (item.code === code) {
            result = item;
            return result;
        }
        if (item.child_menu && item.child_menu.length > 0) {
            result = recursion(item.child_menu, code);
            if (result) { return result; }
        }
    }
}

// 处理没有值的参数
export  function deleteParams(params: any) {
    for(const key in params) {
        if(params[key] === ''|| params[key] === null || params[key] === undefined) {
            delete params[key]
        }
    }
}

// 设置表单数据 data为所获取的数据，target为要赋值的form对象（{}）
export function setFormData(data: any, target: any) {
  if(data) {
    Object.keys(target).map((key: string) => {
      target[key] = data.hasOwnProperty(key) ? data[key] : target[key];
    })
  }

}
