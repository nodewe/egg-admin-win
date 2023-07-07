

//菜单管理
export default win=>{
    return [
        {
            label: '刷新',
            click:()=>{
                // console.log(webContents);
                // win.location.reload()
                // win.webContents.executeJavaScript('console.log(1111)')
                win.webContents.reload()
            },
          
          },
    ]

};
