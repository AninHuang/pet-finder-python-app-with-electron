import sys
import numpy as np
import matplotlib.pyplot as plt

pets_male = int(sys.argv[1])
pets_female = int(sys.argv[2])

def show_gender_diagram(male, female):
    height = np.arange(2)
    # 標題
    plt.title('Matching animal gender')
    # 刻度
    plt.xticks(height, ['Male', 'Female'])
    # plt.yticks(np.arange(max(male, female)), ['Number'])
    plt.ylabel('Number')
    
    plt.bar(height, [male, female], facecolor='lightskyblue')

    return plt.show()

print(show_gender_diagram(pets_male, pets_female))


# import gmplot package
# import sys 
# import gmplot 

# pet_city = sys.argv[1]
# pet_state = sys.argv[2]

# def show_lineplot(): 
#     gmap = gmplot.GoogleMapPlotter.from_geocode("San Francisco")
#     gmap2 = gmplot.GoogleMapPlotter(37.428, -122.145, 16)
#     gmap.apikey = 
  
#     gmap.draw("C:\\Users\\user\\Desktop\\map11.html")

# print(show_lineplot())