window.onload = () => {
  const $container = $('.your-class')
  const $slick = $container.slick({
    arrows: false,
  })

  $('#add').click(() => {
    const $newEl = $(`<div>
      <img src="http://via.placeholder.com/750x250">
    </div>`)

    $slick.slickAdd(`<div>
    <img src="http://via.placeholder.com/750x250">
  </div>`, 0, false)
  })

}
