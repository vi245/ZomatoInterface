

function buildForm({action,params}){
    const form=document.createElement('form');
    form.setAttribute('method','post');
    form.setAttribute('action',action);
    Object.keys(params).forEach(key=>{
        const input=document.createElement('input');
        input.setAttribute('type','hidden');
        input.setAttribute('name',key);
        input.setAttribute('value',JSON.stringify(params[key]));
        form.appendChild(input);

    })
    return form;
}

export function post(details){
    const form=buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
}