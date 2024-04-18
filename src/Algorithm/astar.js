
export const astar = (visitCtx, gridCtx, speed) => {
    const cor=gridCtx.cor; //terminal cordinate;    
    const noRows=gridCtx.noRows.rows;       //total no of rows and cols;
    const noCols=gridCtx.noCols.cols;
    console.log(cor.end.x);
    let dis = [];     //2d infinity
    for (let i = 0; i < noRows; i++) {
        dis.push([]);
        for (let j = 0; j < noCols; j++) {
            dis[i].push(Number.MAX_SAFE_INTEGER);
        }
    }

    let parent = (new Array(noRows)).fill().map(function(){ return new Array(noCols).fill([-1,-1]);});  
    
    const isInRange=(curr)=>{
            return curr.x>=0 && curr.y>=0 && curr.x<noRows && curr.y<noCols;
    }
    
    const findMinDistance = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let minDis = Number.MAX_SAFE_INTEGER, minVer = null;
                for(let i=0;i<noRows;i++){
                    for (let j = 0; j < noCols; j++){
                        if (visitCtx.visited[i][j] >= -1) {
                            const huristicDistace = dis[i][j] + (Math.abs(cor.end.x - i) + Math.abs(cor.end.y - j)*2);
                           if (huristicDistace < minDis) {
                                minDis=huristicDistace;
                                minVer={x:i, y:j};
                            }
                        }
                    }   
                }
                resolve(minVer);
            },speed);
        });
    }
    
    const printPath=()=>{
        let curr=parent[cor.end.x][cor.end.y];

        var timer=setInterval(()=>{
            if (curr[0] == cor.start.x && curr[1] == cor.start.y) { 
                visitCtx.setVisited(curr[0],curr[1],-1);
                clearInterval(timer);
                return;
            }
            visitCtx.setVisited(curr[0],curr[1],-4);
            curr=parent[curr[0]][curr[1]];
        }, speed);
    }

    const executeAstar=async()=>{
        dis[cor.start.x][cor.start.y] = 0;

        while (true) {

            let u = await findMinDistance();
            if (u == null) {
                return;
            }
            
            visitCtx.setVisited(u.x, u.y, -3); //visited

            let dir = [[-1, 0], [0, -1], [1, 0], [0, 1]];
                
            for (let i = 0; i < dir.length; i++) {
                let ele = dir[i];
                let newCorr = { x: ele[0] + u.x, y: u.y + ele[1] };

                if (isInRange(newCorr) && visitCtx.visited[newCorr.x][newCorr.y] >= -1 &&
                    (dis[u.x][u.y] + visitCtx.weight[newCorr.x][newCorr.y]) < dis[newCorr.x][newCorr.y]) {
                    parent[newCorr.x][newCorr.y] = [u.x, u.y];
                    dis[newCorr.x][newCorr.y] = dis[u.x][u.y] + visitCtx.weight[newCorr.x][newCorr.y];
                    if (newCorr.x === cor.end.x && newCorr.y === cor.end.y) {
                        printPath();
                        return;
                    }
                }
            }
        }
    }
    executeAstar();
}

// export default astar;

