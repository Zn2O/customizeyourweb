/*
 * Taken and modified from Firebug Copyright (c) 2007, Parakey Inc. All rights
 * reserved. see firebug-license.txt
 */
(function() {
with (customizeyourweb) {
   const edgeSize = 2

	function FrameHighlighter(showInfoSpan, color) {
      this.AbstractHighlighter()
		this.showInfoSpan = showInfoSpan
      this.color = color
	}

	FrameHighlighter.prototype = {
		drawHighlighter: function(infoSpanContent){
         var element = this.getTargetElement()
         var offset = DomUtils.getOffsetToBody(element);
			var x = offset.x, y = offset.y;
			var w = element.offsetWidth, h = element.offsetHeight;

			var nodes = this.getNodes();

			DomUtils.moveTo(nodes.top, x, y - edgeSize);
			DomUtils.resizeTo(nodes.top, w, edgeSize);

			DomUtils.moveTo(nodes.right, x + w, y - edgeSize);
			DomUtils.resizeTo(nodes.right, edgeSize, h + edgeSize * 2);

			DomUtils.moveTo(nodes.bottom, x, y + h);
			DomUtils.resizeTo(nodes.bottom, w, edgeSize);

			DomUtils.moveTo(nodes.left, x - edgeSize, y - edgeSize);
			DomUtils.resizeTo(nodes.left, edgeSize, h + edgeSize * 2);

			if (this.showInfoSpan) {
            var infoSpan = nodes.infoSpan
            var text = ""
            if(infoSpanContent!=null){
               text = infoSpanContent
            }else{
               var text = element.tagName
               if(!StringUtils.isEmpty(element.id))
                  text += " (id:" + element.id + ")"
               if(StringUtils.isEmpty(element.id) && !StringUtils.isEmpty(element.name))
                  text += " (name:" + element.name + ")"
            }
            infoSpan.innerHTML = text
            var infoSpanX = x + w + edgeSize - infoSpan.offsetWidth
            var infoSpanY = y - edgeSize - infoSpan.offsetHeight
            if(infoSpanY<0){
               infoSpanY += infoSpan.offsetHeight + edgeSize
            }
            DomUtils.moveTo(nodes.infoSpan, infoSpanX, infoSpanY);
			}
		},

		createNodes : function() {
			var doc = this.getTargetWindow().document;
         var color = this.color

			function createEdge() {
				var div = doc.createElementNS("http://www.w3.org/1999/xhtml", "div");
				div.cywIgnore = true;
				div.className = "cyw_highlightFrame";
            if(color)
               div.style.setProperty("background-color", color, "")
				return div;
			}

         var nodes = {
   			top : createEdge(),
   			right : createEdge(),
   			bottom : createEdge(),
   			left : createEdge()
         }

			if (this.showInfoSpan) {
				var span = doc.createElementNS("http://www.w3.org/1999/xhtml", "span");
				span.cywIgnore = true;
            span.className = "cyw_infoSpan";
				nodes.infoSpan = span
			}
         return nodes
		}
	};
   
   ObjectUtils.extend(FrameHighlighter, "AbstractHighlighter", customizeyourweb)

	customizeyourweb.Namespace.bindToNamespace("customizeyourweb", "FrameHighlighter", FrameHighlighter)

}
})()