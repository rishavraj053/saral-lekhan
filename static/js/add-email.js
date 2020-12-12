// jshint esversion: 6

window.addEventListener('load', function(){

    const selectType = document.querySelector('#select_typeInfo');
    const selectCategory = document.querySelector('#select_categoryInfo');
    const selectSubCategory = document.querySelector('#select_subCategoryInfo');
    const tableEmail = document.querySelector('#table_email');

    // Function to update list of available categories for a particular type.
    selectType.addEventListener('change', function(){
        const type_id = this.options[this.selectedIndex].value;
        var baseUrl = 'https://saral-lekhan.000webhostapp.com/getCategory.php?type_id=';
        const finalUrl = baseUrl + type_id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', finalUrl, true);
        xhttp.setRequestHeader('content-type', 'text/plain');
        xhttp.onload = function(){
            var obj = JSON.parse(this.response);
            var fragment = document.createDocumentFragment();
            var options = fragment.appendChild(document.createElement('option'));
            options.text = 'Select Category';
            options.value = 'NULL';
            for(var i=0; i<obj.length; i++){
                options = fragment.appendChild(document.createElement('option'));
                options.text = obj[i].category_name;
                options.value = obj[i].category_id;
            }
            selectCategory.innerHTML = '';
            selectCategory.appendChild(fragment);
        };
        xhttp.send();
    });

    // Function to update list of available subcategories for a particular category.
    selectCategory.addEventListener('change', function(){
        const type_id = selectType.options[selectType.selectedIndex].value;
        const category_id = selectCategory.options[selectCategory.selectedIndex].value;
        var baseUrl = 'https://saral-lekhan.000webhostapp.com/getSubCategory.php?type_id=';
        const finalUrl = baseUrl + type_id + '&category_id=' + category_id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', finalUrl, true);
        xhttp.setRequestHeader('content-type', 'text/plain');
        xhttp.onload = function(){
            var obj = JSON.parse(this.response);
            var fragment = document.createDocumentFragment();
            var options = fragment.appendChild(document.createElement('option'));
            options.text = 'Select SubCategory';
            options.value = 'NULL';
            for(var i=0; i<obj.length; i++){
                options = fragment.appendChild(document.createElement('option'));
                options.text = obj[i].subcategory_name;
                options.value = obj[i].subcategory_id;
            }
            selectSubCategory.innerHTML = '';
            selectSubCategory.appendChild(fragment);
        };
        xhttp.send();
    });

    // Function to update list of available emails for a particular subcategory.
    selectSubCategory.addEventListener('change', function(){
        const subcategory_id = selectSubCategory.options[selectSubCategory.selectedIndex].value;
        var baseUrl = 'https://saral-lekhan.000webhostapp.com/getDataInfo.php?subcategory_id=';
        const finalUrl = baseUrl + subcategory_id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', finalUrl, true);
        xhttp.setRequestHeader('content-type', 'text/plain');
        xhttp.onload = function(){
            var obj = JSON.parse(this.response);
            var fragment = document.createDocumentFragment();
            var tb = fragment.appendChild(document.createElement('thead'));
            var tr = tb.appendChild(document.createElement('tr'));
            var th = tr.appendChild(document.createElement('th'));
            th.scope = 'col';
            th.textContent = '#';
            th = tr.appendChild(document.createElement('th'));
            th.scope = 'col';
            th.textContent = 'Content';
            th = tr.appendChild(document.createElement('th'));
            th.scope = 'col';
            th.textContent = 'Subcategory';
            th = tr.appendChild(document.createElement('th'));
            th.scope = 'col';
            th.textContent = 'Type';
            th = tr.appendChild(document.createElement('th'));
            th.scope = 'col';
            th.textContent = 'Action';
            tb = fragment.appendChild(document.createElement('tbody'));
            for(var i=0; i<obj.length; i++){
                tr = tb.appendChild(document.createElement('tr'));
                td = tr.appendChild(document.createElement('td'));
                td.scope = 'col';
                td.textContent = i+1;
                td = tr.appendChild(document.createElement('td'));
                td.scope = 'col';
                td.textContent = obj[i].content;
                td = tr.appendChild(document.createElement('td'));
                td.scope = 'col';
                td.textContent = obj[i].subcategory_name;
                td = tr.appendChild(document.createElement('td'));
                td.scope = 'col';
                td.textContent = obj[i].type_name;
                td = tr.appendChild(document.createElement('td'));
                td.scope = 'col';
                td.innerHTML = "<a href=\"#\"><svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-pencil-square\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"><path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/></svg></a>";
                console.log(obj[i]);
            }
            tableEmail.innerHTML = '';
            tableEmail.appendChild(fragment);
        };
        xhttp.send();
    });

});