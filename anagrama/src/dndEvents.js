/* DnD events:
 *         dragstart, drag, dragenter, dragleave, dragover, drop, dragend
 *
 *  Most mobile devices do not listen to the drag events that are bound to the DOM, instead of use:
 *         touchstart, touchend, touchenter, touchcancel, touchleave, touchmove
 *  Dragging properties:
 *    dataTransfer.effectAllowed = none, copy, copyLink, copyMove, link, linkMove, move, all, uninitialized
 *    dataTransfer.dropEffect = none, copy, link, move
 *    e.dataTransfer.setDragImage(imgElement, x, y)
 *
 */

const DnD = {
  dragEl: null,
  onDragStart: function(e) {
    this.classList.add("drag--moving");
    DnD.dragEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  },
  onDragOver: function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  },
  onDragEnter: function(e) {
    this.classList.add("drag--hover");
  },
  onDragLeave: function(e) {
    this.classList.remove("drag--hover");
  },
  onDrop: function(e) {
    if (e.stopPropagation) e.stopPropagation();
    DnD.dragEl.innerHTML = this.innerHTML;    
    this.innerHTML = e.dataTransfer.getData("text/html");
    updateWordInput()
    return false;
  },
  onDragEnd: function(e) {
    this.classList.remove("drag--moving");
    [].forEach.call(boxes, function(box) {
      box.classList.remove("drag--hover");
    });
  }
  
};

const boxes = document.querySelectorAll(".grid-item[draggable]");
[].forEach.call(boxes, function(box) {
  box.textContent = Math.floor(Math.random() * (10 - 0));

  box.addEventListener("dragstart", DnD.onDragStart, false);
  box.addEventListener("dragenter", DnD.onDragEnter, false);
  box.addEventListener("dragover", DnD.onDragOver, false);
  box.addEventListener("dragleave", DnD.onDragLeave, false);
  box.addEventListener("drop", DnD.onDrop, false);
  box.addEventListener("dragend", DnD.onDragEnd, false);
});
