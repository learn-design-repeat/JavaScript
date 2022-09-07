ShowMapPopup = (element) => {
    const title = $(element).data('title')
    const url = $(element).data('url')
    $('#routeModalHeading').html(title)
    $('#modelFrame').attr('src', url)
    $('.routeModal').addClass('is-visible')
}

closePopup = () => {
    $('.routeModal').removeClass('is-visible')
}
