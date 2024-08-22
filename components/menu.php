<style>
    .menuDiv{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        transition: all 0.5s;
    }
    .menuText{
        color: #f1f1f1;
        font-size: 2rem;
    }
</style>
<div class="menuDiv">
    <div class="yourRecords">
        <p class="menuText">Your 3x3 record: <span class="yourRecord3x3">-</span></p>
        <p class="menuText">Your 4x4 record: <span class="yourRecord4x4">-</span></p>
        <p class="menuText">Your 5x5 record: <span class="yourRecord5x5">-</span></p>   
    </div>
    <div class="worldRecords">
        <p class="menuText">World 3x3 record: <span class="worldRecord3x3">
            <?php
                parse_str(file_get_contents('../records/records.txt'), $records);
                print_r($records['3x3']);
            ?>
        </span></p>
        <p class="menuText">World 4x4 record: <span class="worldRecord4x4">
            <?php
                $nameDir = '../records';
                $nameFile = $nameDir."/records.txt";

                parse_str(file_get_contents($nameFile), $records);
                print_r($records['4x4']);
            ?>
        </span></p>
        <p class="menuText">World 5x5 record: <span class="worldRecord5x5">
            <?php
                $nameDir = '../records';
                $nameFile = $nameDir."/records.txt";

                parse_str(file_get_contents($nameFile), $records);
                print_r($records['5x5']);
            ?>
        </span></p>
    </div>
</div>