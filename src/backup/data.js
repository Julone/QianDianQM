export default [{
        css: {
            backgroundImage: `url('https://img10.360buyimg.com/imgzone/jfs/t1/61154/6/9626/225675/5d7466c3Ee42061f6/4938be3b7e869df5.jpg')`,
            width: '518px',
            height: '206px'
        },
        className: 'item',
        tag: "div",
        children: [{
                tag: 'a',
                css: 'position:absolute;left:0;top:0;width:30%;height:100px',
                url: '/a',
                events: {
                    click: {
                        funName: 'info',
                        data: {
                            params: {
                                id: 23432423,
                            }
                        }
                    }
                },
            },
            {
                tag: 'a',
                css: 'position:absolute;right:0;top:0;width:50%;height:100%',
                url: '/b?id=2343242304893208',

                children: [{
                    tag: 'a',
                    css: 'position:absolute;right:0;top:0;width:20%;height:100%',
                    url: '/b',
                    children: [{
                        tag: 'a',
                        css: 'position:absolute;right:0;top:0;width:10%;height:100%',
                        url: '/b',
                    }]
                }]
            },
        ]
    }, {
        css: {
            width: '518px',
            height: '473px',
            backgroundImage: `url('https://img10.360buyimg.com/imgzone/jfs/t1/103831/10/6483/428573/5df349faE2f2d4147/a45aecf79cb796e2.jpg')`,
        },
        className: 'item',
        tag: 'div',
        children: [{
                tag: 'a',
                css: 'position:absolute;left:100px;top:60px;width:75px;height:120px',
                url: '/aa',
                events: {
                    click: {
                        funName: 'complexJump',
                        data: {
                            url: 'sadf',
                            name: 'asdf',
                            params: {
                                q: '243'
                            },
                            query: {
                                id: 234
                            }
                        }

                    }
                }
            },
            {
                tag: 'a',
                css: 'position:absolute;left:175x;top:60px;width:75px;height:120px',
                url: '/bb',
            },

        ]
    }


]