//
//  NativeBinding.hpp
//  AsukaZeroTrump
//
//  Created by 森田修康 on 2016/06/09.
//
//

#ifndef NativeBinding_hpp
#define NativeBinding_hpp

#include "jsapi.h"
#include "jsfriendapi.h"

#ifdef __cplusplus
extern "C" {
#endif
    
void js_register_native_binding(JSContext* cx, JS::HandleObject object);
    
#ifdef __cplusplus
}
#endif
        
#endif /* NativeBinding_hpp */
