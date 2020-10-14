(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const temp = `
<style>

.flexrenderer {
  width: 100%;
  height: 100%;
}

.flex-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  justify-content: space-between;
}

.flex-container > viewer-item {
  background-color: #f1f1f1;
  flex-grow: 1;
  flex-basis: auto;
  
}

.viewer-item {
   position: relative;
   width: 100%;
   height: 100%;
}

</style>
<div id="flex-container" class="flex-container"></div>
`;

    const loadScript = (src, el) => __awaiter(void 0, void 0, void 0, function* () {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        return new Promise((resolve, reject) => {
            el.appendChild(script);
            script.onload = () => {
                console.log('Script ' + name + ' loaded');
                resolve();
            };
            script.onerror = (error) => {
                console.log('Script ' + name + ' failed to load');
                reject(error);
            };
        });
    });
    const loadStyle = (href, el) => __awaiter(void 0, void 0, void 0, function* () {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = href;
        style.type = 'text/css';
        return new Promise((resolve, reject) => {
            el.appendChild(style);
            style.onload = () => {
                console.log('Style ' + name + ' loaded');
                resolve();
            };
            style.onerror = (error) => {
                console.log('Style ' + name + ' failed to load');
                reject(error);
            };
        });
    });

    class IndexingExtension {
        constructor(viewer, options) {
            this.extension = new Autodesk.Viewing.Extension(viewer, options);
        }
        load() {
            return this.extension.load();
        }
        unload() {
            return this.extension.unload();
        }
        onToolbarCreated(toolbar) {
            // const but = new Autodesk.Viewing.UI.Button('my-view-front-button');
            // but.setToolTip('AKS SYNC Tool');
            // const subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
            // but.onClick = (e: any) => {
            //   this.syncToButler();
            // };
            // subToolbar.addControl(but);
            // this.extension.viewer.toolbar.addControl(subToolbar);
        }
        syncWithButler(urngroupkey) {
            return __awaiter(this, void 0, void 0, function* () {
                const label = this.extension.viewer.model.getData().metadata.title;
                const urn = this.extension.viewer.model.getData().urn;
                this.write2Logging('Sarte Sync ' + label);
                let urntype = '';
                if (this.extension.viewer.model.is2d()) {
                    urntype = 'forge2d';
                }
                if (this.extension.viewer.model.is3d()) {
                    urntype = 'forge3d';
                }
                const toPostIndexedItems = {
                    urn,
                    urntype,
                    urngroupkey,
                    properties: new Array(),
                };
                // TODO: Make Propertynames configable
                const propnames = new Array();
                if (this.extension.viewer.model.is2d()) {
                    propnames.push('AKS_NUMMER');
                    propnames.push('Description');
                }
                if (this.extension.viewer.model.is3d()) {
                    propnames.push('IfcGUID');
                }
                if (propnames.length > 0) {
                    try {
                        yield new Promise((resolve, reject) => {
                            this.write2Logging('Lese Eigenschaften ' + propnames.join(','));
                            this.extension.viewer.model.getBulkProperties([], propnames, (arr) => {
                                arr.forEach((prop) => {
                                    const property = {
                                        itemid: '' + prop.dbId + '',
                                        propertyname: prop.properties[0].displayName,
                                        propertyvalue: prop.properties[0].displayValue,
                                    };
                                    debugger;
                                    toPostIndexedItems.properties.push(property);
                                });
                                this.write2Logging('Auslesen der Eigenschaften fertig. ' + arr.length + ' Elemente gefunden.');
                                resolve();
                            }, (err) => {
                                reject();
                            });
                        });
                    }
                    catch (error) {
                        this.write2Logging('Fehler beim Auslesen der Eigenschaften');
                    }
                    try {
                        this.write2Logging('Sende Daten an Server ...');
                        yield new Promise((resolve, reject) => {
                            const http = new XMLHttpRequest();
                            const url = this.extension.options.forgeviewerserviceUrl +
                                '/api/Indexing/indexitems?token=' +
                                this.extension.options.token;
                            const params = JSON.stringify(toPostIndexedItems);
                            http.open('POST', url, true);
                            // Send the proper header information along with the request
                            http.setRequestHeader('Content-type', 'application/json');
                            http.onreadystatechange = () => {
                                // Call a function when the state changes.
                                if (http.readyState === 4 && http.status === 200) {
                                    this.write2Logging('Sync fertig! ' + label);
                                    resolve();
                                }
                                if (http.readyState === 4 && http.status !== 200) {
                                    if (http.status === 403) {
                                        this.write2Logging('Kein Autorisierung für Zugriff auf Viewerbox API');
                                    }
                                    if (http.status === 400) {
                                        this.write2Logging('Aks Butler micht geladen, bitte über die Advancedgui laden.');
                                    }
                                    reject();
                                }
                            };
                            http.send(params);
                        });
                    }
                    catch (error) {
                        this.write2Logging('Fehler beim Senden der Daten zu Server!');
                    }
                }
                this.extension.options.onFinish();
            });
        }
        write2Logging(logmsg) {
            const dateTime = new Date();
            this.extension.options.onLogging(dateTime.getHours() +
                ':' +
                dateTime.getMinutes() +
                ':' +
                dateTime.getSeconds() +
                '    ' +
                logmsg);
        }
    }
    // const panel = new Autodesk.Viewing.UI.DockingPanel(
    //   this.extension.viewer.container as HTMLElement,
    //   'awesomeExtensionPanel',
    //   'AKSNummer 2 AKS-Butler',
    //   undefined
    // );
    // panel.setVisible(true);
    // panel.container.style.height = "auto";
    // panel.container.style.width  = "auto";
    // panel.container.style.resize = "none";
    // panel.container.style.left = 20 + "px";
    // panel.container.style.top = 20 + "px";
    // debugger;

    const forgeviewercss = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css';
    const forgeviewerscript = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
    var config = { forgeviewercss, forgeviewerscript };

    class SelectorExtension {
        constructor(viewer, options) {
            this.extension = new Autodesk.Viewing.Extension(viewer, options);
            this.registerEvents();
        }
        load() {
            return this.extension.load();
        }
        unload() {
            return this.extension.unload();
        }
        registerEvents() {
            this.extension.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (e) => __awaiter(this, void 0, void 0, function* () {
                if (e.dbIdArray.length > 0) {
                    // VORSICHT getBulkProperties2 liefert grossen Array obwohl selDbId mitgegeben !!!
                    // e.model.getBulkProperties2(selDbId, undefined, async (arr: any) => {
                    //   // this.extension.options.onSelected(arr);
                    // });
                    const productionids = yield this.getProductionIdsForSelections(e.dbIdArray);
                    this.extension.options.onSelectedWithProductionId(productionids);
                    this.write2Logging('Selected: ProductionIds' + productionids);
                }
            }));
        }
        getProductionIdsForSelections(itemids) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const productionId = yield new Promise((resolve, reject) => {
                        const url = this.extension.options.forgeviewerserviceUrl +
                            '/api/Selector/getproductionidsfromselections?token=' +
                            this.extension.options.token +
                            '&itemids=' +
                            itemids.join(';');
                        const http = new XMLHttpRequest();
                        http.open('GET', url, true);
                        http.onreadystatechange = () => {
                            // Call a function when the state changes.
                            if (http.readyState === 4 && http.status === 200) {
                                resolve(http.responseText);
                            }
                            if (http.readyState === 4 && http.status !== 200) {
                                if (http.status === 403) {
                                    this.write2Logging('Kein Zugriff auf die Service API');
                                }
                                reject();
                            }
                        };
                        http.send();
                    });
                    return Promise.resolve(JSON.parse(productionId));
                }
                catch (error) {
                    this.write2Logging('Fehler bei Anfrage zu Server!');
                    return Promise.reject();
                }
            });
        }
        selectElements(properties) {
            return __awaiter(this, void 0, void 0, function* () {
                // this.write2Logging('select ' + properties);
                const foundallids = [];
                // const propertynames = new Array<string>();
                // debugger;
                properties.map((property) => {
                    foundallids.push(property.itemid);
                });
                this.extension.viewer.select(foundallids);
                // this.extension.viewer.getVisibleModels().forEach((vmodel) => {
                //   this.extension.viewer.fitToView(foundallids, vmodel);
                // });
                return Promise.resolve();
            });
        }
        write2Logging(logmsg) {
            const dateTime = new Date();
            this.extension.options.onLogging(dateTime.getHours() +
                ':' +
                dateTime.getMinutes() +
                ':' +
                dateTime.getSeconds() +
                '    ' +
                logmsg);
        }
    }

    class ThemingExtension {
        constructor(viewer, options) {
            this.extension = new Autodesk.Viewing.Extension(viewer, options);
        }
        load() {
            return this.extension.load();
        }
        unload() {
            return this.extension.unload();
        }
        // async themeElements(themingkeys: string[]) {
        //   if (this._viewer !== undefined && themingkeys.length > 0) {
        //     this._viewer.clearThemingColors(this._viewer.model);
        //     await Promise.all(
        //       themingkeys.map((themingkey) => {
        //         return new Promise((resolve, reject) => {
        //           this._viewer.search(
        //             themingkey,
        //             (foundids: number[]) => {
        //               foundids.map((foundid) => {
        //                 const h2v4 = hexToVec4('#FFFF00');
        //                 // this._viewer.getVisibleModels().forEach((vmodel) => {
        //                 //   const col = new THREE.Vector4(rgba.r, rgba.g, rgba.b, rgba.a);
        //                 //   this._viewer.setThemingColor(foundid, col, vmodel);
        //                 // });
        //                 const col = new THREE.Vector4(h2v4[0], h2v4[1], h2v4[2], h2v4[3]);
        //                 this._viewer.setThemingColor(foundid, col, this._viewer.model, true);
        //               });
        //               resolve();
        //             },
        //             (err: any) => {
        //               console.log('Error in Search');
        //               resolve();
        //             },
        //             []
        //           );
        //         });
        //       })
        //     );
        //     return Promise.resolve();
        //   }
        // }
        write2Logging(logmsg) {
            const dateTime = new Date();
            this.extension.options.onLogging(dateTime.getHours() +
                ':' +
                dateTime.getMinutes() +
                ':' +
                dateTime.getSeconds() +
                '    ' +
                logmsg);
        }
    }

    class ViewerBox extends HTMLElement {
        constructor() {
            super();
            this.viewerboxconfig = new Array();
        }
        connectedCallback() {
            return __awaiter(this, void 0, void 0, function* () {
                // prepare globals
                yield this.prepareForgeGlobalRequisits();
                this.createTemplate();
                this.dispatchEvent(new CustomEvent('VIEWERBOX_INIT_FINISHED_EVENT', { detail: 'Viewerbox Init fertig.' }));
            });
        }
        createTemplate() {
            let flexrenderer = document.getElementById('flexrenderer');
            if (flexrenderer === null) {
                flexrenderer = document.createElement('div');
                flexrenderer.id = 'flexrenderer';
                flexrenderer.className = 'flexrenderer';
                flexrenderer.innerHTML = temp;
                this.appendChild(flexrenderer);
            }
        }
        prepareForgeGlobalRequisits() {
            return __awaiter(this, void 0, void 0, function* () {
                const promises = [];
                promises.push(loadStyle(config.forgeviewercss, this));
                promises.push(loadScript(config.forgeviewerscript, this));
                yield Promise.all(promises);
                // Register Media Extensions globally
                Autodesk.Viewing.theExtensionManager.registerExtension('Media.Indexing', IndexingExtension);
                Autodesk.Viewing.theExtensionManager.registerExtension('Media.Selector', SelectorExtension);
                Autodesk.Viewing.theExtensionManager.registerExtension('Media.Theming', ThemingExtension);
                return Promise.resolve();
            });
        }
        loadViewerBoxbyProductionId(productionid) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield new Promise((resolve, reject) => {
                        const url = this.viewerboxserviceurl +
                            '/api/Config/getconfigforproductionid?token=' +
                            this.token +
                            '&productionid=' +
                            productionid;
                        const http = new XMLHttpRequest();
                        http.open('GET', url, true);
                        http.onreadystatechange = () => {
                            // Call a function when the state changes.
                            if (http.readyState === 4 && http.status === 200) {
                                // const test = http.responseText;
                                // debugger;
                                this.viewerboxconfig = JSON.parse(http.responseText);
                                resolve();
                            }
                            if (http.readyState === 4 && http.status !== 200) {
                                if (http.status === 403) {
                                    this.writeLogging('Kein Zugriff auf die Service API');
                                }
                                reject();
                            }
                        };
                        http.send();
                    });
                }
                catch (error) {
                    this.writeLogging('Fehler bei Anfrage zu Server!');
                }
                // this.viewerconfigs = [
                //   {
                //     urn: 'dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLmxzaW5Wck43UlNXbXlRSFBfMGlEcWc_dmVyc2lvbj0x',
                //     urntype: 'forge',
                //     urngroupkey: 'dc127ae6-42c6-4dd0-8518-9c1cfd8cc71c',
                //     properties: [
                //       {
                //         propertyname: 'AKS_NUMMER',
                //         propertyvalue: 'Forge-O04-0044',
                //       },
                //     ],
                //   },
                //   {
                //     urn: 'dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLmQ2aVZSM3pSVFBTNjlEXzhVVzV6bXc_dmVyc2lvbj0x',
                //     urntype: 'forge',
                //     urngroupkey: '9badf13b-74ce-4e47-b376-ac1e37f513a1',
                //   },
                // ];
                this.clearViewersDynamically();
                this.start();
                return Promise.resolve();
            });
        }
        loadViewerboxSingleUrn(urn, urntype, urngroupkey) {
            return __awaiter(this, void 0, void 0, function* () {
                this.viewerboxconfig = [
                    {
                        urn,
                        urntype,
                        urngroupkey,
                    },
                ];
                // this.clearAllViewers();
                this.clearViewersDynamically();
                this.start();
            });
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.createAndInitViewers();
                yield this.loadUrnsInViewers();
                this.executeSelections(); // Must not be awaited for
                this.dispatchEvent(new CustomEvent('VIEWERBOX_LOADED_EVENT', { detail: 'Viewerbox fertig geladen.' }));
            });
        }
        clearAllViewers() {
            return __awaiter(this, void 0, void 0, function* () {
                const flexcontainer = document.getElementById('flex-container');
                if (flexcontainer !== null) {
                    flexcontainer.innerHTML = '';
                }
            });
        }
        clearViewersDynamically() {
            return __awaiter(this, void 0, void 0, function* () {
                const flexcontainer = document.getElementById('flex-container');
                if (flexcontainer !== null) {
                    const htmlcollection = flexcontainer.getElementsByClassName('viewer-item');
                    const viewers = Array.from(htmlcollection);
                    viewers.map((vieweritem) => {
                        const vconfig = this.viewerboxconfig.find((conf) => conf.urngroupkey === vieweritem.id);
                        if (!vconfig) {
                            vieweritem.remove();
                        }
                    });
                }
            });
        }
        createAndInitViewers() {
            return __awaiter(this, void 0, void 0, function* () {
                const flexcontainer = document.getElementById('flex-container');
                if (flexcontainer !== null) {
                    // Can NOT be executed parallel (Autdesk Library is just globaly available), thats why (let index ...
                    // tslint:disable-next-line: prefer-for-of
                    for (let index = 0; index < this.viewerboxconfig.length; index++) {
                        const vconfig = this.viewerboxconfig[index];
                        const viewerelementId = vconfig.urngroupkey;
                        const viewerelement = document.getElementById(viewerelementId);
                        if (!viewerelement) {
                            if (vconfig.urntype === 'forge') {
                                yield new Promise((resolve, reject) => {
                                    const vieweritem = document.createElement('viewer-item-forge');
                                    vieweritem.id = vconfig.urngroupkey;
                                    vieweritem.className = 'viewer-item';
                                    vieweritem.addEventListener('VIEWER_INITIALIZED', (e) => {
                                        resolve();
                                    });
                                    vieweritem.setAttribute('viewerboxserviceurl', this.viewerboxserviceurl);
                                    vieweritem.setAttribute('token', this.token);
                                    vieweritem.addEventListener('INDEXING_LOGGING_EVENT', (e) => {
                                        this.writeLogging(e.detail);
                                    });
                                    vieweritem.addEventListener('GEOMETRY_LOADED_EVENT', (e) => {
                                        this.writeLogging('Geometrie geladen von ' + e.detail.modelname);
                                    });
                                    vieweritem.addEventListener('INDEXING_FINISHED_EVENT', (e) => {
                                        this.dispatchEvent(new CustomEvent('INDEXING_FINISHED_EVENT', { detail: e.detail }));
                                    });
                                    vieweritem.addEventListener('SELECTION_CHANGED_EVENT', (e) => {
                                        this.dispatchEvent(new CustomEvent('SELECTION_CHANGED_EVENT', { detail: e.detail }));
                                    });
                                    vieweritem.addEventListener('SELECTION_CHANGED_WITHPRODUCTIONID_EVENT', (e) => {
                                        this.dispatchEvent(new CustomEvent('SELECTION_CHANGED_WITHPRODUCTIONID_EVENT', { detail: e.detail }));
                                    });
                                    vieweritem.addEventListener('SELECTOR_LOGGING_EVENT', (e) => {
                                        this.writeLogging(e.detail);
                                    });
                                    vieweritem.addEventListener('THEMING_FINISHED_EVENT', (e) => {
                                        this.dispatchEvent(new CustomEvent('THEMING_FINISHED_EVENT', { detail: e.detail }));
                                    });
                                    vieweritem.addEventListener('THEMING_LOGGING_EVENT', (e) => {
                                        this.writeLogging(e.detail);
                                    });
                                    flexcontainer.appendChild(vieweritem);
                                });
                            }
                        }
                    }
                    return Promise.resolve();
                }
            });
        }
        loadUrnsInViewers() {
            return __awaiter(this, void 0, void 0, function* () {
                const flexcontainer = document.getElementById('flex-container');
                if (flexcontainer !== null) {
                    const htmlcollection = flexcontainer.getElementsByClassName('viewer-item');
                    const viewers = Array.from(htmlcollection);
                    // Can be executed parallel, thats why Promise.all
                    yield Promise.all(viewers.map((vieweritem) => {
                        return new Promise((resolve, reject) => {
                            if (!vieweritem.isViewerAlreadyLoaded()) {
                                const vconfig = this.viewerboxconfig.find((conf) => conf.urngroupkey === vieweritem.id);
                                vieweritem.loadURN(vconfig.urn);
                                vieweritem.addEventListener('GEOMETRY_LOADED_EVENT', (e) => {
                                    resolve();
                                });
                            }
                            if (vieweritem.isViewerAlreadyLoaded()) {
                                resolve();
                            }
                        });
                    }));
                    return Promise.resolve();
                }
            });
        }
        startIndexing() {
            const flexcontainer = document.getElementById('flex-container');
            if (flexcontainer !== null) {
                const htmlcollection = flexcontainer.getElementsByClassName('viewer-item');
                const viewers = Array.from(htmlcollection);
                if (viewers.length === 0) {
                    this.writeLogging('Keine Quelle vorhanden bzw. geladen');
                }
                viewers.map((vieweritem) => {
                    if (vieweritem.isViewerAlreadyLoaded()) {
                        vieweritem.startIndexing(vieweritem.id);
                    }
                });
            }
        }
        executeSelections() {
            const flexcontainer = document.getElementById('flex-container');
            if (flexcontainer !== null) {
                const htmlcollection = flexcontainer.getElementsByClassName('viewer-item');
                const viewers = Array.from(htmlcollection);
                viewers.map((vieweritem) => {
                    if (vieweritem.isViewerAlreadyLoaded()) {
                        const vconfig = this.viewerboxconfig.find((conf) => conf.urngroupkey === vieweritem.id);
                        if (vconfig.properties) {
                            vieweritem.startSelecting(vconfig.properties);
                        }
                    }
                });
            }
        }
        writeLogging(msg) {
            this.dispatchEvent(new CustomEvent('VIEWERBOX_LOGGING_EVENT', {
                detail: msg,
            }));
        }
        get viewerboxserviceurl() {
            return this.getAttribute('viewerboxserviceurl') !== null
                ? this.getAttribute('viewerboxserviceurl')
                : '';
        }
        get token() {
            return this.getAttribute('token') !== null ? this.getAttribute('token') : '';
        }
        disconnectedCallback() {
            // TODO: Destroy Viewer instance !!!!!!!!! https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/
            // TODO: Deregister all Events!
            console.log('disconnected from the DOM');
        }
        static get observedAttributes() {
            return this._observedAttributes;
        }
    }
    ViewerBox._observedAttributes = ['viewerboxserviceurl', 'token'];

    class ViewerItemForge extends HTMLElement {
        constructor() {
            super();
            // _selector: ForgeSelector;
            // _theming: ForgeTheming;
            this._viewerloaded = false;
            this.getToken = (onGetAccessToken) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', this.viewerboxserviceurl + '/api/Forge/getaccesstoken?token=' + this.token);
                xhr.onreadystatechange = () => {
                    if (xhr.status === 200 && xhr.readyState === 4) {
                        if (xhr.response) {
                            onGetAccessToken(JSON.parse(xhr.response).access_token, 86400);
                        }
                    }
                    if (xhr.status !== 200) {
                        alert('Fehler beim Abrufen des Accesstokens!');
                        console.log(xhr.status);
                    }
                };
                xhr.send();
            };
            this._viewer = {};
            // this._selector = ForgeSelector.create(this._viewer);
            // this._theming = ForgeTheming.create(this._viewer);
        }
        connectedCallback() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.initializeViewer();
                // this._selector = ForgeSelector.create(this._viewer);
                // this._theming = ForgeTheming.create(this._viewer);
            });
        }
        initializeViewer() {
            return __awaiter(this, void 0, void 0, function* () {
                const options = {
                    env: 'AutodeskProduction',
                    getAccessToken: this.getToken,
                    refreshToken: this.getToken,
                    api: 'derivativeV2_EU',
                    language: 'de',
                };
                yield new Promise((resolve, reject) => {
                    Autodesk.Viewing.Initializer(options, () => {
                        this._viewer = new Autodesk.Viewing.GuiViewer3D(this);
                        const startedCode = this._viewer.start();
                        if (startedCode > 0) {
                            console.error('Failed to create a Viewer: WebGL not supported.');
                            reject();
                        }
                        this.loadExtensions();
                        this.registerEvents();
                        console.log('Initialization complete, Extensions loaded, Events registered ... model can be loaded next!');
                        resolve();
                    });
                });
                // debugger;
                this.dispatchEvent(new CustomEvent('VIEWER_INITIALIZED', {
                    detail: {},
                }));
                return Promise.resolve();
            });
        }
        loadExtensions() {
            // Selfmade Media Extensions
            this._viewer.loadExtension('Media.Indexing', {
                forgeviewerserviceUrl: this.viewerboxserviceurl,
                token: this.token,
                onFinish: (info) => {
                    this.dispatchEvent(new CustomEvent('INDEXING_FINISHED_EVENT', { detail: info }));
                },
                onLogging: (logtxt) => {
                    this.dispatchEvent(new CustomEvent('INDEXING_LOGGING_EVENT', { detail: logtxt }));
                },
            });
            this._viewer.loadExtension('Media.Selector', {
                forgeviewerserviceUrl: this.viewerboxserviceurl,
                token: this.token,
                onSelected: (info) => {
                    this.dispatchEvent(new CustomEvent('SELECTION_CHANGED_EVENT', { detail: info }));
                },
                onSelectedWithProductionId: (info) => {
                    this.dispatchEvent(new CustomEvent('SELECTION_CHANGED_WITHPRODUCTIONID_EVENT', { detail: info }));
                },
                onLogging: (logtxt) => {
                    this.dispatchEvent(new CustomEvent('SELECTOR_LOGGING_EVENT', { detail: logtxt }));
                },
            });
            this._viewer.loadExtension('Media.Theming', {
                forgeviewerserviceUrl: this.viewerboxserviceurl,
                token: this.token,
                onFinished: (theme) => {
                    this.dispatchEvent(new CustomEvent('THEMING_FINISHED_EVENT', { detail: theme }));
                },
                onLogging: (logtxt) => {
                    this.dispatchEvent(new CustomEvent('THEMING_LOGGING_EVENT', { detail: logtxt }));
                },
            });
            // Build In Extensions
            // this._viewer.loadExtension('Autodesk.DocumentBrowser');
            // this._viewer.loadExtension('Autodesk.BIM360.Minimap');
            // this._viewer.loadExtension('Autodesk.Edit2D');
        }
        registerEvents() {
            this._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => {
                this.dispatchEvent(new CustomEvent('GEOMETRY_LOADED_EVENT', {
                    detail: {
                        modelname: e.model.getData().metadata.title,
                        urn: e.model.getData().urn,
                        is2d: e.model.is2d(),
                        is3d: e.model.is3d(),
                    },
                }));
            });
        }
        loadURN(urn) {
            return __awaiter(this, void 0, void 0, function* () {
                const _self = this;
                return new Promise((resolve, reject) => {
                    Autodesk.Viewing.Document.load('urn:' + urn, (viewerDocument) => {
                        const defaultModel = viewerDocument.getRoot().getDefaultGeometry();
                        if (_self._viewer !== undefined) {
                            _self._viewer
                                .loadDocumentNode(viewerDocument, defaultModel)
                                .then((model) => {
                                this._viewerloaded = true;
                                resolve(model);
                            })
                                .catch((reason) => {
                                reject(reason);
                            });
                        }
                    }, (errCode, errorMsg, messages) => {
                        reject(errorMsg);
                    });
                });
            });
        }
        isViewerAlreadyLoaded() {
            return this._viewerloaded;
        }
        startIndexing(urngroupkey) {
            const indexingextension = this._viewer.getExtension('Media.Indexing');
            indexingextension.syncWithButler(urngroupkey);
        }
        startSelecting(properties) {
            const selectorextension = this._viewer.getExtension('Media.Selector');
            selectorextension.selectedFromOutside = true;
            selectorextension.selectElements(properties);
        }
        disconnectedCallback() {
            // ###### Destroy Viewer instance !!!!!!!!!
            // https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/initialization/
            console.log('disconnected from the DOM');
        }
        attributeChangedCallback(name, oldValue, newValue) { }
        get viewerboxserviceurl() {
            return this.getAttribute('viewerboxserviceurl') !== null
                ? this.getAttribute('viewerboxserviceurl')
                : '';
        }
        get token() {
            return this.getAttribute('token') !== null ? this.getAttribute('token') : '';
        }
        get URN() {
            return this._viewer.model.getData().urn;
        }
        static get observedAttributes() {
            return this._observedAttributes;
        }
    }
    ViewerItemForge._observedAttributes = ['viewerboxserviceurl', 'token'];

    (() => {
        window.customElements.define('viewer-box', ViewerBox);
        window.customElements.define('viewer-item-forge', ViewerItemForge);
    })();

}());
