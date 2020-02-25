class Radio{
	constructor( id ){
		const elements = document.getElementsByTagName( "radio-button" );

		for ( let i = 0; i < elements.length; i++){
			const element = elements[i];

			if ( element.getAttribute("data-id") === id ){
				this.element = element;
				this.init();

				return;
			}
		}

		throw "nahui idi";
	}

	init(){
		const items = this.element.getElementsByTagName( "div" );

		this.value = null;

		for ( let i = 0; i < items.length; i++){
			const item = items[i];

			if ( item.getAttribute("checked") != null ){
				item.classList.add("checked");
				this.value = item.getAttribute("data-id");
			}

			item.addEventListener("click", () => this.check( item ))
		}
	}

	check( item ){
		const value = item.getAttribute( "value" );
		const items = this.element.getElementsByTagName( "div" );

    	item.toggleAttribute( "checked" );
    	item.classList.toggle( "checked" );

    	if ( this.value === value )
    		this.value = null;
    	else{
    		for ( let i = 0; i < items.length; i++){
    			if (this.value == items[i].getAttribute("value")){
    				items[i].toggleAttribute("checked");
    				items[i].classList.toggle("checked");
    			}
    		}
	   		this.value = value;
    	}

    	this.element.dispatchEvent( new CustomEvent( "check", { detail : item } ) )
	}

	on( e, callback ){
    	this.element.addEventListener( e, callback );
  	}

  	clear(){
    	this.value = null;
    	this.element.innerHTML = "";
  	}

  	add( text, value ){
    	const div = document.createElement( "div" );
    	div.classList.toggle("item")

    	if( value ) div.setAttribute( "value", value );

    	div.addEventListener( "click", () => this.check( div ) );
    	div.innerHTML = text;
    	this.element.appendChild( div );
  	}

  	fill( data ){
  		this.clear();
  		data.forEach(item => this.add( item[0], item[1] ))
  	}

  	checkAll(){
    	const items = this.element.getElementsByTagName( "div" );

    	this.value = null;

	    for( let i = 0; i < items.length; i++ ){
	      const item = items[i];
	      const checked = item.getAttribute( "checked" ) !== null;

	      if( !checked ){
	        item.toggleAttribute( "checked" );
	        item.classList.toggle( "checked" );
	      }

	      this.value = item.getAttribute( "value" );
	    }

	    this.element.dispatchEvent( new Event( "checkAll" ) );
  	}

  	uncheckAll(){
	    const items = this.element.getElementsByTagName( "div" );

	    for( let i = 0; i < items.length; i++ ){
	      const item = items[i];
	      const checked = item.getAttribute( "checked" ) !== null;

	      if( checked ){
	        item.toggleAttribute( "checked" );
	        item.classList.toggle( "checked" );
	      }
	    }

	    this.element.dispatchEvent( new Event( "uncheckAll" ) );
	 }
}