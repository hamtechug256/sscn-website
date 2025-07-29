import { supabase } from './supabase-config.js';

let currentUser = null;

supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
        const urlParams = new URLSearchParams(window.location.search);
        const designId = urlParams.get('designId');
        if (designId) {
            loadDesign(designId);
        }
    } else {
        currentUser = null;
        // Redirect to login if not authenticated and not on login/signup page
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('signup.html')) {
            window.location.href = '/public/login.html';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const addTextButton = document.getElementById('add-text');
    const addShapeButton = document.getElementById('add-shape');
    const imageInput = document.getElementById('add-image');
    const bgColorInput = document.getElementById('bg-color');
    const exportPngButton = document.getElementById('export-png');
    const exportPdfButton = document.getElementById('export-pdf');
    const layersList = document.getElementById('layers');
    const deleteButton = document.getElementById('delete-element');
    const duplicateButton = document.getElementById('duplicate-element');
    const saveDesignButton = document.getElementById('save-design');
    const dashboardButton = document.getElementById('dashboard-button');
    const logoutButton = document.getElementById('logout-button');

    // Properties Panel Controls
    const fontSizeControl = document.getElementById('font-size');
    const fontFamilyControl = document.getElementById('font-family');
    const textColorControl = document.getElementById('text-color');
    const bgColorElementControl = document.getElementById('bg-element-color');

    // Alignment Controls
    const alignLeftButton = document.getElementById('align-left');
    const alignCenterButton = document.getElementById('align-center');
    const alignRightButton = document.getElementById('align-right');
    const alignTopButton = document.getElementById('align-top');
    const alignMiddleButton = document.getElementById('align-middle');
    const alignBottomButton = document.getElementById('align-bottom');

    // Canvas Settings Controls
    const canvasWidthControl = document.getElementById('canvas-width');
    const canvasHeightControl = document.getElementById('canvas-height');
    const gridSizeControl = document.getElementById('grid-size');

    // Zoom Controls
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const zoomSlider = document.getElementById('zoom-slider');

    let elementCounter = 0;
    let currentZoom = 1;

    function updateLayers() {
        layersList.innerHTML = '';
        const elements = Array.from(canvas.children);
        elements.forEach((element, index) => {
            const layerItem = document.createElement('li');
            layerItem.textContent = `Element ${element.dataset.id}`;
            layerItem.dataset.index = index;
            if (element.classList.contains('active')) {
                layerItem.classList.add('active');
            }
            layerItem.addEventListener('click', () => {
                const activeElements = document.querySelectorAll('.active');
                activeElements.forEach(el => el.classList.remove('active'));
                element.classList.add('active');
                updateLayers();
            });
            layersList.appendChild(layerItem);
        });
    }

    function addElementToCanvas(element) {
        element.dataset.id = ++elementCounter;
        canvas.appendChild(element);
        makeDraggable(element);
        updateLayers();
    }

    // Add Shape
    addShapeButton.addEventListener('click', () => {
        const shapeElement = document.createElement('div');
        shapeElement.style.position = 'absolute';
        shapeElement.style.left = '50px';
        shapeElement.style.top = '50px';
        shapeElement.style.width = '100px';
        shapeElement.style.height = '100px';
        shapeElement.style.backgroundColor = '#007bff';
        shapeElement.style.cursor = 'move';
        addElementToCanvas(shapeElement);
    });

    // Add Text
    addTextButton.addEventListener('click', () => {
        const textElement = document.createElement('div');
        textElement.contentEditable = 'true';
        textElement.innerText = 'Double-click to edit';
        textElement.style.position = 'absolute';
        textElement.style.left = '50px';
        textElement.style.top = '50px';
        textElement.style.cursor = 'move';
        textElement.style.padding = '10px';
        textElement.style.border = '1px dashed #ccc';
        addElementToCanvas(textElement);
    });

    // Add Image
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgElement = document.createElement('img');
                imgElement.src = event.target.result;
                imgElement.style.position = 'absolute';
                imgElement.style.left = '50px';
                imgElement.style.top = '50px';
                imgElement.style.width = '150px';
                imgElement.style.cursor = 'move';
                canvas.appendChild(imgElement);
                makeDraggable(imgElement);
            };
            reader.readAsDataURL(file);
        }
    });

    import { template1 } from './templates/template1.js';
import { template2 } from './templates/template2.js';
import { template3 } from './templates/template3.js';

    // Templates
    const templates = {
        template1: template1,
        template2: template2,
        template3: template3
    };

    document.querySelectorAll('.template').forEach(template => {
        template.addEventListener('click', () => {
            const templateName = template.dataset.template;
            loadTemplate(templateName);
        });
    });

    function loadTemplate(templateName) {
        canvas.innerHTML = '';
        elementCounter = 0;
        const template = templates[templateName];
        template.forEach(element => {
            if (element.type === 'text') {
                const textElement = document.createElement('div');
                textElement.contentEditable = 'true';
                textElement.innerText = element.content;
                textElement.style.position = 'absolute';
                textElement.style.left = element.left;
                textElement.style.top = element.top;
                textElement.style.cursor = 'move';
                textElement.style.padding = '10px';
                textElement.style.border = '1px dashed #ccc';
                addElementToCanvas(textElement);
            } else if (element.type === 'shape') {
                const shapeElement = document.createElement('div');
                shapeElement.style.position = 'absolute';
                shapeElement.style.left = element.left;
                shapeElement.style.top = element.top;
                shapeElement.style.width = element.width;
                shapeElement.style.height = element.height;
                shapeElement.style.backgroundColor = element.color;
                shapeElement.style.cursor = 'move';
                addElementToCanvas(shapeElement);
            } else if (element.type === 'image') {
                const imgElement = document.createElement('img');
                imgElement.src = element.src;
                imgElement.style.position = 'absolute';
                imgElement.style.left = element.left;
                imgElement.style.top = element.top;
                imgElement.style.width = '150px';
                imgElement.style.cursor = 'move';
                addElementToCanvas(imgElement);
            }
        });
    }

    // Delete Element
    deleteButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.remove();
            updateLayers();
        }
    });

    // Duplicate Element
    duplicateButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            const newElement = activeElement.cloneNode(true);
            newElement.classList.remove('active');
            newElement.style.left = (parseInt(newElement.style.left) + 20) + 'px';
            newElement.style.top = (parseInt(newElement.style.top) + 20) + 'px';
            addElementToCanvas(newElement);
        }
    });

    // Background Color
    bgColorInput.addEventListener('input', (e) => {
        canvas.style.backgroundColor = e.target.value;
    });

    // Canvas Settings
    canvasWidthControl.addEventListener('input', (e) => {
        canvas.style.width = e.target.value + 'px';
        canvas.parentElement.style.width = (parseInt(e.target.value) + 40) + 'px'; // Adjust container width
    });

    canvasHeightControl.addEventListener('input', (e) => {
        canvas.style.height = e.target.value + 'px';
        canvas.parentElement.style.height = (parseInt(e.target.value) + 40) + 'px'; // Adjust container height
    });

    gridSizeControl.addEventListener('input', (e) => {
        const size = e.target.value;
        if (size > 0) {
            canvas.style.backgroundImage = `linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)`;
            canvas.style.backgroundSize = `${size}px ${size}px`;
        } else {
            canvas.style.backgroundImage = 'none';
        }
    });

    // Alignment Controls
    alignLeftButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.style.left = '0px';
        }
    });

    alignCenterButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.style.left = (canvas.offsetWidth / 2 - activeElement.offsetWidth / 2) + 'px';
        }
    });

    alignRightButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.style.left = (canvas.offsetWidth - activeElement.offsetWidth) + 'px';
        }
    });

    alignTopButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.style.top = '0px';
        }
    });

    alignMiddleButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.style.top = (canvas.offsetHeight / 2 - activeElement.offsetHeight / 2) + 'px';
        }
    });

    alignBottomButton.addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        if (activeElement) {
            activeElement.style.top = (canvas.offsetHeight - activeElement.offsetHeight) + 'px';
        }
    });

    // Zoom Controls
    zoomInButton.addEventListener('click', () => {
        currentZoom = Math.min(currentZoom + 0.1, 2);
        updateZoom();
    });

    zoomOutButton.addEventListener('click', () => {
        currentZoom = Math.max(currentZoom - 0.1, 0.5);
        updateZoom();
    });

    zoomSlider.addEventListener('input', (e) => {
        currentZoom = parseFloat(e.target.value);
        updateZoom();
    });

    function updateZoom() {
        canvas.style.transform = `scale(${currentZoom})`;
        zoomSlider.value = currentZoom;
    }

    // Export as PNG
    exportPngButton.addEventListener('click', () => {
        html2canvas(canvas).then(canvas => {
            const link = document.createElement('a');
            link.download = 'design.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // Export as PDF
    exportPdfButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        html2canvas(canvas).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('design.pdf');
        });
    });

    // Save Design
    saveDesignButton.addEventListener('click', async () => {
        if (!currentUser) {
            alert('Please log in to save your design.');
            return;
        }

        const designName = prompt('Enter a name for your design:');
        if (!designName) {
            return;
        }

        const elementsData = [];
        Array.from(canvas.children).forEach(element => {
            const type = element.tagName.toLowerCase();
            const style = element.style;
            const data = {
                type: type,
                left: style.left,
                top: style.top,
                width: style.width,
                height: style.height,
                transform: style.transform,
                backgroundColor: style.backgroundColor,
                color: style.color,
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                innerText: element.innerText,
                src: element.src
            };
            elementsData.push(data);
        });

        const designData = {
            userId: currentUser.id,
            name: designName,
            canvasBgColor: canvas.style.backgroundColor,
            canvasWidth: canvas.style.width,
            canvasHeight: canvas.style.height,
            canvasGridSize: gridSizeControl.value,
            elements: elementsData,
            lastModified: new Date().toISOString()
        };

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const designId = urlParams.get('designId');

            if (designId) {
                const { data, error } = await supabase
                    .from('designs')
                    .update(designData)
                    .eq('id', designId);

                if (error) throw error;
                alert('Design updated successfully!');
            } else {
                const { data, error } = await supabase
                    .from('designs')
                    .insert([designData])
                    .select();

                if (error) throw error;
                alert('Design saved successfully with ID: ' + data[0].id);
                window.history.pushState({}, '', `/public/index.html?designId=${data[0].id}`);
            }
        } catch (error) {
            alert('Error saving design: ' + error.message);
        }
    });

    // Dashboard Button
    dashboardButton.addEventListener('click', () => {
        window.location.href = '/public/dashboard.html';
    });

    // Logout Button
    logoutButton.addEventListener('click', async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            alert('Logged out successfully!');
            window.location.href = '/public/login.html';
        } catch (error) {
            alert(error.message);
        }
    });

    async function loadDesign(designId) {
        try {
            const { data, error } = await supabase
                .from('designs')
                .select('*')
                .eq('id', designId)
                .single();

            if (error) throw error;

            if (data) {
                const design = data;
                canvas.innerHTML = '';
                canvas.style.backgroundColor = design.canvasBgColor || '#ffffff';
                canvas.style.width = design.canvasWidth || '800px';
                canvas.style.height = design.canvasHeight || '600px';
                canvas.parentElement.style.width = (parseInt(canvas.style.width) + 40) + 'px';
                canvas.parentElement.style.height = (parseInt(canvas.style.height) + 40) + 'px';
                if (design.canvasGridSize > 0) {
                    canvas.style.backgroundImage = `linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)`;
                    canvas.style.backgroundSize = `${design.canvasGridSize}px ${design.canvasGridSize}px`;
                } else {
                    canvas.style.backgroundImage = 'none';
                }
                elementCounter = 0;

                design.elements.forEach(data => {
                    let element;
                    if (data.type === 'div' && data.innerText) { // Assuming text elements are divs with innerText
                        element = document.createElement('div');
                        element.contentEditable = 'true';
                        element.innerText = data.innerText;
                        element.style.padding = '10px';
                        element.style.border = '1px dashed #ccc';
                    } else if (data.type === 'div') { // Assuming shapes are divs without innerText
                        element = document.createElement('div');
                    } else if (data.type === 'img') {
                        element = document.createElement('img');
                        element.src = data.src;
                    }

                    if (element) {
                        element.style.position = 'absolute';
                        element.style.left = data.left;
                        element.style.top = data.top;
                        element.style.width = data.width;
                        element.style.height = data.height;
                        element.style.transform = data.transform;
                        element.style.backgroundColor = data.backgroundColor;
                        element.style.color = data.color;
                        element.style.fontSize = data.fontSize;
                        element.style.fontFamily = data.fontFamily;
                        addElementToCanvas(element);
                    }
                });
                updateLayers();
            } else {
                alert("No such design!");
            }
        } catch (error) {
            alert("Error loading design: " + error.message);
        }
    }

    // Make elements draggable
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Add resize and rotate handles
    function addHandles(element) {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        element.appendChild(resizeHandle);

        const rotateHandle = document.createElement('div');
        rotateHandle.className = 'rotate-handle';
        element.appendChild(rotateHandle);

        // Resize logic
        resizeHandle.onmousedown = function(e) {
            e.stopPropagation();
            let startX = e.clientX;
            let startY = e.clientY;
            let startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
            let startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);

            document.onmousemove = function(e) {
                element.style.width = (startWidth + e.clientX - startX) + 'px';
                element.style.height = (startHeight + e.clientY - startY) + 'px';
            }

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }

        // Rotate logic
        rotateHandle.onmousedown = function(e) {
            e.stopPropagation();
            let centerX = element.offsetLeft + element.offsetWidth / 2;
            let centerY = element.offsetTop + element.offsetHeight / 2;
            let startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            let startRotation = element.style.transform.replace('rotate(', '').replace('deg)', '') || 0;

            document.onmousemove = function(e) {
                let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                element.style.transform = 'rotate(' + (parseFloat(startRotation) + angle - startAngle) + 'deg)';
            }

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }

    canvas.addEventListener('click', function(e) {
        if (e.target !== canvas) {
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(el => el.classList.remove('active'));
            e.target.classList.add('active');
            addHandles(e.target);
            updateLayers();
            updatePropertiesPanel(e.target);
        } else {
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(el => el.classList.remove('active'));
            updateLayers();
            clearPropertiesPanel();
        }
    });

    // Update properties panel when an element is selected
    function updatePropertiesPanel(element) {
        // Clear previous values
        clearPropertiesPanel();

        // Populate controls based on element type
        if (element.tagName.toLowerCase() === 'div' && element.contentEditable === 'true') { // Text element
            fontSizeControl.value = parseInt(element.style.fontSize) || 16;
            fontFamilyControl.value = element.style.fontFamily || 'Arial';
            textColorControl.value = element.style.color || '#000000';
            bgColorElementControl.value = element.style.backgroundColor || '#ffffff';

            fontSizeControl.oninput = (e) => { element.style.fontSize = e.target.value + 'px'; };
            fontFamilyControl.onchange = (e) => { element.style.fontFamily = e.target.value; };
            textColorControl.oninput = (e) => { element.style.color = e.target.value; };
            bgColorElementControl.oninput = (e) => { element.style.backgroundColor = e.target.value; };

        } else if (element.tagName.toLowerCase() === 'div') { // Shape element
            bgColorElementControl.value = element.style.backgroundColor || '#007bff';
            bgColorElementControl.oninput = (e) => { element.style.backgroundColor = e.target.value; };
        }
        // For images, no specific properties yet
    }

    // Clear properties panel
    function clearPropertiesPanel() {
        fontSizeControl.value = '';
        fontFamilyControl.value = 'Arial';
        textColorControl.value = '#000000';
        bgColorElementControl.value = '#ffffff';

        fontSizeControl.oninput = null;
        fontFamilyControl.onchange = null;
        textColorControl.oninput = null;
        bgColorElementControl.oninput = null;
    }

    // Local Storage for unsaved changes
    function saveCanvasStateLocally() {
        const elementsData = [];
        Array.from(canvas.children).forEach(element => {
            const type = element.tagName.toLowerCase();
            const style = element.style;
            const data = {
                type: type,
                left: style.left,
                top: style.top,
                width: style.width,
                height: style.height,
                transform: style.transform,
                backgroundColor: style.backgroundColor,
                color: style.color,
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                innerText: element.innerText,
                src: element.src
            };
            elementsData.push(data);
        });

        const canvasState = {
            canvasBgColor: canvas.style.backgroundColor,
            canvasWidth: canvas.style.width,
            canvasHeight: canvas.style.height,
            canvasGridSize: gridSizeControl.value,
            elements: elementsData
        };
        localStorage.setItem('miniCanvaUnsavedDesign', JSON.stringify(canvasState));
    }

    function loadCanvasStateLocally() {
        const savedState = localStorage.getItem('miniCanvaUnsavedDesign');
        if (savedState) {
            const design = JSON.parse(savedState);
            canvas.innerHTML = '';
            canvas.style.backgroundColor = design.canvasBgColor || '#ffffff';
            canvas.style.width = design.canvasWidth || '800px';
            canvas.style.height = design.canvasHeight || '600px';
            canvas.parentElement.style.width = (parseInt(canvas.style.width) + 40) + 'px';
            canvas.parentElement.style.height = (parseInt(canvas.style.height) + 40) + 'px';
            if (design.canvasGridSize > 0) {
                canvas.style.backgroundImage = `linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)`;
                canvas.style.backgroundSize = `${design.canvasGridSize}px ${design.canvasGridSize}px`;
            } else {
                canvas.style.backgroundImage = 'none';
            }
            elementCounter = 0;

            design.elements.forEach(data => {
                let element;
                if (data.type === 'div' && data.innerText) { // Assuming text elements are divs with innerText
                    element = document.createElement('div');
                    element.contentEditable = 'true';
                    element.innerText = data.innerText;
                    element.style.padding = '10px';
                    element.style.border = '1px dashed #ccc';
                } else if (data.type === 'div') { // Assuming shapes are divs without innerText
                    element = document.createElement('div');
                } else if (data.type === 'img') {
                    element = document.createElement('img');
                    element.src = data.src;
                }

                if (element) {
                    element.style.position = 'absolute';
                    element.style.left = data.left;
                    element.style.top = data.top;
                    element.style.width = data.width;
                    element.style.height = data.height;
                    element.style.transform = data.transform;
                    element.style.backgroundColor = data.backgroundColor;
                    element.style.color = data.color;
                    element.style.fontSize = data.fontSize;
                    element.style.fontFamily = data.fontFamily;
                    addElementToCanvas(element);
                }
            });
            updateLayers();
        }
    }

    // Load saved state on startup
    loadCanvasStateLocally();

    // Save state every 5 seconds
    setInterval(saveCanvasStateLocally, 5000);
});