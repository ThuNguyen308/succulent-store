const format = {
    formatPrice: (price) => new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })
                            .format(price),
}

export default format