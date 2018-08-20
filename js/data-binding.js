function DataBinder() {
    let prevModel = undefined;

    const parseTemplate = (template) => {
        const container = document.createElement('div');
        container.innerHTML = template;
        return container;
    }
    
    const getProperty = (object, path) => {
        const pathParts = path.split('.');
        let variable = object;
        pathParts.every(part => {
        if (!(part in variable)) {
            variable = undefined;
            return false;
        }
        variable = variable[part];
        return true;
        });
        return variable;
    }

    const areEqual = (model1, model2) => JSON.stringify(model1) === JSON.stringify(model2);

    const copyObject = (obj) => JSON.parse(JSON.stringify(obj));

    const clock = (myhtml) => {
        myhtml.querySelectorAll('*').forEach(element => {
            const data = element.dataset;
            if (data.bind) element.innerHTML = getProperty(model, data.bind);
            if (data.bindTitle) element.setAttribute('title', getProperty(model, data.bindTitle));
            if (data.bindHref) element.setAttribute('href', getProperty(model, data.bindHref));
            if (data.bindSrc) element.setAttribute('src', getProperty(model, data.bindSrc));
            if (data.bindAlt) element.setAttribute('alt', getProperty(model, data.bindTitle));
        });
        prevModel = copyObject(model);
    }
    
    const bind = (model, template) => {
        const myhtml = parseTemplate(template);
        setInterval(clock, 100, myhtml);
        return myhtml;
    }

    return {
        bind
    }
}

const model = {
    label: 'Schibsted',
    x: { y: { z: 'some nested property to bind' } }
};

const viewTemplate = `<h1 data-bind="label" data-bind-title="x.y.z"></h1>`;

document.addEventListener("DOMContentLoaded", () => {
    const dataBinder = new DataBinder();
    const view = dataBinder.bind(model, viewTemplate);
    document.querySelector('#content').appendChild(view);
});
