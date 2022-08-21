import time
import sys


def primary_num(amount: int):
    if amount == 1:
        return [2]
    num_list = [2]
    starter = 1

    while len(num_list) != amount:
        starter += 2
        checker = 0
        for i in range(1, starter):
            if starter % i == 0:
                checker += 1
            if checker > 1:
                break
        else:
            if checker == 1:
                num_list.append(starter)
    return num_list


start = time.time()
print(primary_num(int(sys.argv[1])))
print(time.time() - start)
