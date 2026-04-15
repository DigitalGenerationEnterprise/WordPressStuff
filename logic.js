(function($) {
    let panelLocked = true;

    $(window).on('elementor:init', function() {
        
        // 1. THE SNAP-BACK (Same as before, keep it locked)
        elementor.hooks.addAction('panel/open_editor/widget', function() {
            if (panelLocked) {
                setTimeout(function() { if (window.$e) $e.route('panel/elements/categories'); }, 15);
            }
        });

        // 2. BUILD THE DYNAMIC DUAL PANEL
        const toolbox = $(`
            <div id="eisf-toolbox">
                <div class="eisf-header">
                    <span>EISF Library ⠿</span>
                    <input type="text" id="eisf-search" placeholder="Search widgets...">
                </div>
                <div class="eisf-grid" id="eisf-dynamic-grid">
                    </div>
            </div>
        `);
        $('body').append(toolbox);

        // 3. FETCH & RENDER ALL WIDGETS
        function renderWidgets(filter = '') {
            const grid = $('#eisf-dynamic-grid');
            grid.empty();
            
            // Get all installed/active widgets from Elementor's model
            const allWidgets = elementor.widgets.getModels();
            
            allWidgets.forEach(widget => {
                const title = widget.get('title');
                const name = widget.get('widgetType') || widget.get('name');
                const icon = widget.get('icon');

                // Filter logic for the search bar
                if (filter && !title.toLowerCase().includes(filter.toLowerCase())) return;

                const btn = $(`
                    <button class="eisf-widget-btn" data-w="${name}" title="${title}">
                        <i class="${icon}"></i>
                        <span>${title}</span>
                    </button>
                `);
                grid.append(btn);
            });
        }

        // Initialize the grid
        setTimeout(renderWidgets, 2000); // Wait for widgets to register

        // 4. SEARCH FUNCTIONALITY
        $(document).on('input', '#eisf-search', function() {
            renderWidgets($(this).val());
        });

        // 5. CLICK TO INJECT
        $(document).on('click', '.eisf-widget-btn', function() {
            const widgetType = $(this).data('w');
            if (window.$e) {
                $e.run('document/elements/create', {
                    container: elementor.getPreviewContainer(),
                    model: { 
                        elType: 'container', 
                        elements: [{ elType: 'widget', widgetType: widgetType }] 
                    }
                });
            }
        });

        // 6. TOGGLE & DRAG (Keep existing code from previous versions)
        // [Insert the Drag and Toggle logic from the previous plugin here]
    });
})(jQuery);